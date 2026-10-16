#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
项目实施作战室 · 一体化本地服务（含访客监控）
1) 静态托管本目录（Vue3 构建产物，必须以 HTTP 方式访问）
2) 内置 /pull-api 网关，让「⚡ 实时拉取」页面可用：
   - 默认转发到本机拉取代理 http://127.0.0.1:8766（若已安装并运行官方 pull-api）
   - 可用环境变量 PULL_BACKEND 覆盖上游地址
3) 访客监控：记录所有访问的 IP、时间、页面路径、User-Agent，并提供管理员查看页 /admin/logs
启动：python server.py [端口]   默认 8899
"""
import json, os, sys, time, re, urllib.request, urllib.error, urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
BACKEND = os.environ.get("PULL_BACKEND", "http://127.0.0.1:8766").rstrip("/")
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
LOGS_FILE = os.path.join(DATA_DIR, "access_logs.jsonl")
os.makedirs(DATA_DIR, exist_ok=True)
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type,X-Pull-Token,Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")

    def _log_access(self, method, path, status, ua, ip):
        """记录访问日志"""
        entry = {
            "ts": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ip": ip,
            "method": method,
            "path": path,
            "status": status,
            "ua": ua[:200] if ua else ""
        }
        with open(LOGS_FILE, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    def _get_client_ip(self):
        # 支持反向代理时的真实 IP
        forwarded = self.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return self.client_address[0]

    def _forward(self, path_qs, body=None, ct=None):
        url = BACKEND + path_qs
        req = urllib.request.Request(url, data=body, method="POST" if body is not None else "GET")
        req.add_header("User-Agent", "Mozilla/5.0 pmsim-local-gateway")
        if ct:
            req.add_header("Content-Type", ct)
        tok = self.headers.get("X-Pull-Token")
        if tok:
            req.add_header("X-Pull-Token", tok)
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read()
        except Exception as e:
            msg = {"error": f"上游拉取代理不可达（{BACKEND}）：{e}",
                   "hint": "请先在本机启动官方 pull-api 拉取代理；未安装代理时其余功能不受影响"}
            return 502, json.dumps(msg, ensure_ascii=False).encode()

    def _reply(self, code, payload, ctype="application/json; charset=utf-8"):
        data = payload if isinstance(payload, bytes) else json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self._cors()
        self.end_headers()
        self.wfile.write(data)

    def _body(self):
        n = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(n) if n else b""
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    # ---------- 管理员后台 ----------
    def _admin_logs_page(self):
        """生成管理员日志查看页 HTML"""
        logs = []
        if os.path.exists(LOGS_FILE):
            with open(LOGS_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    try:
                        logs.append(json.loads(line.strip()))
                    except:
                        pass
        logs = list(reversed(logs[-500:]))  # 最近 500 条
        
        rows = ""
        for log in logs:
            rows += f"""<tr style="border-bottom:1px solid #eee">
              <td style="padding:8px;font-family:monospace">{log.get('ts','')}</td>
              <td style="padding:8px;font-family:monospace">{log.get('ip','')}</td>
              <td style="padding:8px">{log.get('method','')}</td>
              <td style="padding:8px;font-family:monospace;font-size:12px">{log.get('path','')}</td>
              <td style="padding:8px"><span style="background:{'#4CAF50' if log.get('status',0)==200 else '#f44336'};color:white;padding:2px 6px;border-radius:3px;font-size:11px">{log.get('status',0)}</span></td>
              <td style="padding:8px;font-size:11px;color:#666;max-width:300px;overflow:hidden;text-overflow:ellipsis">{log.get('ua','')[:100]}</td>
            </tr>"""
        
        html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"><title>管理员后台 · 访客监控</title>
<style>
body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;padding:20px;background:#f5f5f5}}
.container{{max-width:1400px;margin:0 auto;background:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);padding:24px}}
h1{{margin:0 0 8px 0;font-size:24px}}
.meta{{color:#666;font-size:14px;margin-bottom:20px}}
table{{width:100%;border-collapse:collapse;font-size:13px}}
th{{text-align:left;padding:12px 8px;background:#f8f9fa;border-bottom:2px solid #dee2e6;font-weight:600}}
.refresh{{display:inline-block;margin-left:12px;padding:6px 12px;background:#2196F3;color:white;border-radius:4px;text-decoration:none;font-size:13px}}
.stats{{display:flex;gap:16px;margin:16px 0;padding:16px;background:#f8f9fa;border-radius:6px}}
.stat{{flex:1;text-align:center}}
.stat-value{{font-size:28px;font-weight:700;color:#2196F3}}
.stat-label{{font-size:12px;color:#666;margin-top:4px}}
</style></head><body>
<div class="container">
  <h1>📊 访客监控后台</h1>
  <div class="meta">本项目已记录所有访问日志（IP、时间、页面、浏览器信息）· 最后更新：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} <a href="/admin/logs" class="refresh">🔄 刷新</a></div>
  <div class="stats">
    <div class="stat"><div class="stat-value">{len(logs)}</div><div class="stat-label">总访问次数</div></div>
    <div class="stat"><div class="stat-value">{len(set(l.get('ip','') for l in logs))}</div><div class="stat-label">独立访客 (IP)</div></div>
    <div class="stat"><div class="stat-value">{sum(1 for l in logs if l.get('status',0)==200)}</div><div class="stat-label">成功请求 (200)</div></div>
  </div>
  <table><thead><tr>
    <th>时间</th><th>访客 IP</th><th>方法</th><th>访问页面</th><th>状态</th><th>浏览器信息</th>
  </tr></thead><tbody>{rows if rows else '<tr><td colspan="6" style="padding:40px;text-align:center;color:#999">暂无访问记录</td></tr>'}</tbody></table>
</div></body></html>"""
        return html.encode("utf-8")

    # ---------- 路由处理 ----------
    def do_GET(self):
        ip = self._get_client_ip()
        ua = self.headers.get("User-Agent", "")
        
        # 管理员日志页
        if self.path == "/admin/logs":
            auth = self.headers.get("Authorization")
            # 简单密码验证（实际使用应改为更强认证）
            if auth and auth.startswith("Basic "):
                import base64
                try:
                    creds = base64.b64decode(auth[6:]).decode()
                    user, pwd = creds.split(":", 1)
                    if user == "admin" and pwd == "pmsim2026":
                        self.send_response(200)
                        self.send_header("Content-Type", "text/html; charset=utf-8")
                        self._cors()
                        self.end_headers()
                        self.wfile.write(self._admin_logs_page())
                        self._log_access("GET", self.path, 200, ua, ip)
                        return
                except:
                    pass
            # 未授权 → 返回 401
            self.send_response(401)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("WWW-Authenticate", 'Basic realm="Admin Logs"')
            self._cors()
            self.end_headers()
            self.wfile.write("<html><body><h1>401 Unauthorized</h1><p>请输入管理员账号密码查看日志</p></body></html>".encode("utf-8"))
            self._log_access("GET", self.path, 401, ua, ip)
            return
        
        # pull-api 网关
        if self.path.startswith("/pull-api"):
            rest = self.path[len("/pull-api"):] or "/"
            qs = urllib.parse.parse_qs(urllib.parse.urlparse(rest).query)
            if rest.startswith("/ping"):
                try:
                    code, _ = http_get(f"{BACKEND}/ping", timeout=8)
                    upstream = (code == 200)
                except:
                    upstream = False
                self._reply(200, {"ok": True, "mode": "local", "upstream": BACKEND, "upstream_ok": upstream})
                self._log_access("GET", self.path, 200, ua, ip)
                return
            if rest.startswith("/p"):
                target = (qs.get("url") or [""])[0]
                if not target:
                    self._reply(400, {"error": "missing url"})
                    self._log_access("GET", self.path, 400, ua, ip)
                    return
                try:
                    code, data = http_get(target, timeout=25)
                    self._reply(200, data, "text/html; charset=utf-8")
                    self._log_access("GET", self.path, code, ua, ip)
                    return
                except Exception as e:
                    self._reply(502, {"error": str(e)})
                    self._log_access("GET", self.path, 502, ua, ip)
                    return
            if rest.startswith("/batch"):
                ids = (qs.get("ids") or [""])[0]
                tl = (qs.get("tl") or ["0"])[0] == "1"
                idlist = [i for i in ids.split(",") if i.strip()]
                self._do_batch(idlist, tl, ua, ip)
                return
            if rest.startswith("/load"):
                name = (qs.get("name") or [""])[0]
                if not name:
                    files = sorted(f for f in os.listdir(DATA_DIR) if f.endswith(".json")) if os.path.exists(DATA_DIR) else []
                    self._reply(200, {"ok": True, "files": files})
                    self._log_access("GET", self.path, 200, ua, ip)
                    return
                fp = os.path.join(DATA_DIR, os.path.basename(name))
                if not fp.endswith(".json"):
                    fp += ".json"
                if not os.path.exists(fp):
                    self._reply(404, {"error": "not found"})
                    self._log_access("GET", self.path, 404, ua, ip)
                    return
                with open(fp, "rb") as fh:
                    self._reply(200, fh.read())
                    self._log_access("GET", self.path, 200, ua, ip)
                return
            self._reply(404, {"error": "unknown pull-api endpoint"})
            self._log_access("GET", self.path, 404, ua, ip)
            return
        
        # 静态文件
        status = 200
        try:
            SimpleHTTPRequestHandler.do_GET(self)
        except:
            status = 404
        finally:
            self._log_access("GET", self.path, status, ua, ip)

    def do_POST(self):
        ip = self._get_client_ip()
        ua = self.headers.get("User-Agent", "")
        
        if self.path.startswith("/pull-api"):
            rest = self.path[len("/pull-api"):]
            body = self._body()
            if rest.startswith("/batch"):
                ids = body.get("ids") or []
                tl = bool(body.get("tl"))
                self._do_batch([str(i) for i in ids], tl, ua, ip)
                return
            if rest.startswith("/save"):
                fn = str(body.get("filename") or f"save_{int(time.time())}")
                fn = re.sub(r"[^\w\-.]", "_", fn)
                if not fn.endswith(".json"):
                    fn += ".json"
                with open(os.path.join(DATA_DIR, fn), "w", encoding="utf-8") as fh:
                    json.dump(body.get("data"), fh, ensure_ascii=False)
                self._reply(200, {"ok": True, "file": fn})
                self._log_access("POST", self.path, 200, ua, ip)
                return
            if rest.startswith("/log"):
                logs = body.get("logs") or []
                with open(os.path.join(DATA_DIR, "pull_log.jsonl"), "a", encoding="utf-8") as fh:
                    for item in logs:
                        fh.write(json.dumps(item, ensure_ascii=False) + "\n")
                self._reply(200, {"ok": True, "n": len(logs)})
                self._log_access("POST", self.path, 200, ua, ip)
                return
            self._reply(404, {"error": "unknown pull-api endpoint"})
            self._log_access("POST", self.path, 404, ua, ip)
            return
        
        SimpleHTTPRequestHandler.do_POST(self)
        self._log_access("POST", self.path, 200, ua, ip)

    def _do_batch(self, idlist, tl, ua, ip):
        out = []
        for tid in idlist[:200]:
            rec = {"id": tid, "fields": {}, "content_html": "", "reply_html": "", "timeline": []}
            try:
                code, html = http_get(f"{BACKEND}/Offices/Api/VIndex?id={urllib.parse.quote(tid)}&flag=view", timeout=20)
                if code == 200:
                    text = html.decode("utf-8", "ignore")
                    rec["fields"] = parse_ticket(text)
                    rec["content_html"] = text
                if tl:
                    try:
                        _, lg = http_get(f"{BACKEND}/Offices/Api/GetLog?id={urllib.parse.quote(tid)}", timeout=15)
                        rec["timeline"] = [{"html": lg.decode("utf-8", "ignore")}]
                    except:
                        pass
            except Exception as e:
                rec["error"] = str(e)
            out.append(rec)
        self._reply(200, {"ok": True, "results": out})
        self._log_access("POST" if len(idlist) > 10 else "GET", f"/pull-api/batch?ids={','.join(idlist[:5])}...", 200, ua, ip)

def http_get(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 pmsim-local/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read()

def parse_ticket(html):
    """从 VIndex 页面 HTML 提取工单字段"""
    def attr(pattern):
        m = re.search(pattern, html)
        return m.group(1).strip() if m else ""
    fields = {}
    for label in ["所属项目", "处理状态", "审核状态", "处理人", "创建人员", "创建时间", "制单日期", "开始日期", "结束日期", "完成日期", "优先级", "问题描述"]:
        m = re.search(rf">{label}</[^>]+>\s*<[^>]*>\s*([^<]+)", html)
        if m and m.group(1).strip():
            fields[label] = m.group(1).strip()
    t = attr(r"<title>([^<]*)</title>")
    if t:
        fields.setdefault("标题", t.split("-")[0].strip())
    return fields

if __name__ == "__main__":
    print(f"✅ 项目实施作战室 已启动:")
    print(f"   公网访问：http://localhost:{PORT}/index.html#/pmsim")
    print(f"   实时拉取：http://localhost:{PORT}/pull-api/ping")
    print(f"   管理员后台：http://localhost:{PORT}/admin/logs")
    print(f"   管理员账号：admin / pmsim2026")
    print(f"\n📊 访客监控已启用，所有访问将记录到 data/access_logs.jsonl")
    HTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
