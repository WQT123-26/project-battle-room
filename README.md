# 项目实施工作台（本地版）

「项目实施模拟 · 项目经理作战室」本地一体化服务：静态页面 + 实时拉取代理 + 访客监控后台。

## 功能

- 🏭 **项目实施全过程沙盘推演**：倍速推演、单步、精确回退、决策分支、里程碑自动停
- ⚡ **实时拉取**：内置 pull-api 网关（转发到本机 127.0.0.1:8766，可用 `PULL_BACKEND` 环境变量覆盖）
- 📊 **访客监控后台**：记录所有访问的 IP、时间、页面、浏览器信息，管理员可在线查看

## 快速开始

```bash
# 需要 Python 3.8+
python server.py 8899
```

打开 http://localhost:8899/index.html#/pmsim

Windows 用户直接双击 `启动项目实施工作台.bat`。

## 管理员后台

访问 `http://localhost:8899/admin/logs`，账号密码：

- 账号：`admin`
- 密码：见 `admin.env` 文件里的 `ADMIN_PASSWORD`

> 口令不写在 `server.py` 里。优先级：环境变量 `ADMIN_PASSWORD` > 同目录 `admin.env` > 启动时随机生成（仅控制台显示）。改口令只需编辑 `admin.env` 后重启服务。

## 配置项

| 环境变量 | 默认值 | 说明 |
|---|---|---|
| `PULL_BACKEND` | `http://127.0.0.1:8766` | 实时拉取上游代理地址 |

## 发布到公网（内网穿透）

以 cpolar 为例：

```bash
cpolar http 8899
```

即可获得公网地址，分享链接给他人访问，所有访客都会被记录到监控后台。

其他选择：ngrok、frp、Cloudflare Tunnel。

## 目录结构

```
├── index.html              入口页（Vue3 hash 路由）
├── assets/                 前端构建产物
├── server.py               一体化服务（静态 + pull-api + 访客监控）
├── 启动项目实施工作台.bat    Windows 一键启动
├── data/                   访问日志与存档（运行时生成，已被 .gitignore 忽略）
└── 使用说明.md              详细说明
```

## 免责声明

- 本工具仅供学习与研究使用。
- 访客监控仅记录服务器端访问日志（IP、时间、页面），页面需向访客公示本声明。
- 实时拉取功能请确保您对目标系统有合法访问权限。

## License

MIT
