import{Jt as e,Kt as t,U as n,V as r,Yt as i,a,d as o,f as s,h as c,it as l,m as u,pt as d,t as f,v as p,y as m}from"./_plugin-vue_export-helper-CXDp2KR3.js";import{a as h,d as g}from"./runtime-dom.esm-bundler-B4cRQRjO.js";var _={class:`dp-root`},v={class:`dp-top`},y={class:`dp-top-r`},b={class:`dp-prog`},x={class:`dp-pct`},S={class:`dp-steps`},C=[`onClick`],w={class:`dp-sn`},T={class:`dp-body`},E={key:0,class:`dp-step`},D={class:`dp-check`},O={key:1,class:`dp-step`},k={class:`dp-check`},A={key:2,class:`dp-step`},j={class:`dp-check`},M={key:3,class:`dp-step`},N={class:`dp-tabs2`},P={key:0,class:`dp-code`},F={key:1,class:`dp-code`},I={class:`dp-check`},L={key:4,class:`dp-step`},R={class:`dp-check`},z={key:5,class:`dp-step`},B={class:`dp-check`},V={key:6,class:`dp-step`},H={class:`dp-check`},U={key:7,class:`dp-step`},W={class:`dp-check`},G={key:8,class:`dp-step`},K={class:`dp-check`},q={class:`dp-nav`},J=f({__name:`DeployGuideView`,setup(f){let J=d([{t:`本地构建`,done:!1},{t:`安装Nginx`,done:!1},{t:`创建站点`,done:!1},{t:`上传文件`,done:!1},{t:`配置Nginx`,done:!1},{t:`申请SSL`,done:!1},{t:`安全组`,done:!1},{t:`验证访问`,done:!1},{t:`持续部署`,done:!1}]),Y=d(0),X=d(`bt`),Z=d(!1),Q=o(()=>J.value.filter(e=>e.done).length),$=o(()=>Math.round(Q.value/J.value.length*100));return(o,d)=>(r(),c(`div`,_,[s(`div`,v,[d[17]||=s(`div`,null,[s(`h1`,null,`🚀 阿里云宝塔部署指南`),s(`p`,{class:`dp-sub`},`Vue3 项目 → 本地构建 → 宝塔面板上传 → Nginx 配置 → HTTPS 上线`)],-1),s(`div`,y,[s(`div`,b,[s(`div`,{class:`dp-prog-bar`,style:e({width:$.value+`%`})},null,4)]),s(`span`,x,i(Q.value)+`/`+i(J.value.length),1)])]),s(`div`,S,[(r(!0),c(a,null,n(J.value,(e,n)=>(r(),c(`button`,{key:n,class:t([`dp-sb`,{done:e.done,on:Y.value===n}]),onClick:e=>Y.value=n},[s(`span`,w,i(e.done?`✓`:n+1),1),m(i(e.t),1)],10,C))),128))]),s(`div`,T,[Y.value===0?(r(),c(`div`,E,[d[21]||=p(`<h2 data-v-e68641af>1️⃣ 本地构建打包</h2><p class="dp-d" data-v-e68641af>在项目根目录执行构建命令，生成 <code data-v-e68641af>dist/</code> 目录。</p><div class="dp-code" data-v-e68641af><pre data-v-e68641af><code data-v-e68641af># PowerShell · cwd = vue3 项目根目录
npm run build

# 成功输出示例
dist/index.html                   0.46 kB
dist/assets/index-xxxx.js       185.00 kB │ gzip: 60.12 kB
dist/assets/index-xxxx.css       45.00 kB │ gzip: 8.30 kB
✓ built in 1.78s</code></pre></div><div class="dp-tip" data-v-e68641af><span class="dp-ic" data-v-e68641af>💡</span><span data-v-e68641af>本项目使用 hash 路由（<code data-v-e68641af>createWebHashHistory</code>），所以 <code data-v-e68641af>dist/</code> 目录可以直接放到任意静态服务器，无需特殊 rewrite 规则。访问地址自动带 <code data-v-e68641af>#</code>，如 <code data-v-e68641af>example.com/#/dash</code>。</span></div>`,4),s(`div`,D,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[0]||=e=>J.value[0].done=e},null,512),[[h,J.value[0].done]]),d[18]||=m(` 构建成功，`,-1),d[19]||=s(`code`,null,`dist/`,-1),d[20]||=m(` 目录已生成`,-1)])])])):u(``,!0),Y.value===1?(r(),c(`div`,O,[d[23]||=p(`<h2 data-v-e68641af>2️⃣ 宝塔面板安装 Nginx</h2><p class="dp-d" data-v-e68641af>登录阿里云服务器宝塔面板（<code data-v-e68641af>http://你的IP:8888</code>），安装 Nginx。</p><div class="dp-list" data-v-e68641af><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>1</span> 左侧菜单 → <b data-v-e68641af>软件商店</b></div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>2</span> 搜索 <b data-v-e68641af>Nginx</b> → 选择稳定版 → 点击 <b data-v-e68641af>安装</b></div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>3</span> 等待安装完成（约 1-2 分钟）</div></div><div class="dp-tip dp-tip-warn" data-v-e68641af><span class="dp-ic" data-v-e68641af>⚠️</span><span data-v-e68641af>如果宝塔面板未安装，SSH 登录服务器执行：<code data-v-e68641af>curl -sSO http://download.bt.cn/install/install_panel.sh &amp;&amp; bash install_panel.sh ed8484bec</code></span></div>`,4),s(`div`,k,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[1]||=e=>J.value[1].done=e},null,512),[[h,J.value[1].done]]),d[22]||=m(` Nginx 已安装并运行`,-1)])])])):u(``,!0),Y.value===2?(r(),c(`div`,A,[d[25]||=p(`<h2 data-v-e68641af>3️⃣ 创建站点</h2><p class="dp-d" data-v-e68641af>在宝塔面板创建一个站点，作为 Vue3 项目的托管位置。</p><div class="dp-list" data-v-e68641af><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>1</span> 左侧菜单 → <b data-v-e68641af>网站</b> → <b data-v-e68641af>添加站点</b></div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>2</span> 填写信息： <div class="dp-sub-list" data-v-e68641af><div data-v-e68641af>· 域名：你的域名（如 <code data-v-e68641af>quote.example.com</code>）或 IP</div><div data-v-e68641af>· 根目录：<code data-v-e68641af>/www/wwwroot/quote</code></div><div data-v-e68641af>· PHP版本：<b data-v-e68641af>纯静态</b>（选「无」或留空）</div><div data-v-e68641af>· 数据库：不创建</div></div></div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>3</span> 点击 <b data-v-e68641af>提交</b> 创建站点</div></div><div class="dp-tip" data-v-e68641af><span class="dp-ic" data-v-e68641af>💡</span><span data-v-e68641af>宝塔会自动创建根目录 <code data-v-e68641af>/www/wwwroot/quote</code> 并放入一个默认 <code data-v-e68641af>index.html</code>，稍后我们会用构建产物替换它。</span></div>`,4),s(`div`,j,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[2]||=e=>J.value[2].done=e},null,512),[[h,J.value[2].done]]),d[24]||=m(` 站点已创建`,-1)])])])):u(``,!0),Y.value===3?(r(),c(`div`,M,[d[29]||=s(`h2`,null,`4️⃣ 上传构建产物`,-1),d[30]||=s(`p`,{class:`dp-d`},[m(`将本地 `),s(`code`,null,`dist/`),m(` 目录下的所有文件上传到服务器站点根目录。`)],-1),s(`div`,N,[s(`button`,{class:t([`dp-t2`,{on:X.value===`bt`}]),onClick:d[3]||=e=>X.value=`bt`},`宝塔文件管理`,2),s(`button`,{class:t([`dp-t2`,{on:X.value===`scp`}]),onClick:d[4]||=e=>X.value=`scp`},`SCP 命令`,2)]),X.value===`bt`?(r(),c(`div`,P,[...d[26]||=[s(`pre`,null,[s(`code`,null,`# 方法一：宝塔面板上传

1. 左侧菜单 → 文件
2. 进入 /www/wwwroot/quote 目录
3. 删除默认的 index.html
4. 点击「上传」按钮
5. 选择本地 dist/ 目录下的所有文件
6. 确认上传完成

最终目录结构：
/www/wwwroot/quote/
  ├── index.html
  └── assets/
      ├── index-xxxx.js
      ├── index-xxxx.css
      └── ...其他 chunk`)],-1)]])):u(``,!0),X.value===`scp`?(r(),c(`div`,F,[...d[27]||=[s(`pre`,null,[s(`code`,null,`# 方法二：PowerShell SCP 上传（更快）

# 进入本地 dist 目录
cd dist

# 上传所有文件到服务器
scp -r * root@你的IP:/www/wwwroot/quote/

# 或用 rsync（增量上传，更高效）
rsync -avz --delete dist/ root@你的IP:/www/wwwroot/quote/`)],-1)]])):u(``,!0),s(`div`,I,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[5]||=e=>J.value[3].done=e},null,512),[[h,J.value[3].done]]),d[28]||=m(` 文件已上传到站点根目录`,-1)])])])):u(``,!0),Y.value===4?(r(),c(`div`,L,[d[32]||=p(`<h2 data-v-e68641af>5️⃣ 配置 Nginx</h2><p class="dp-d" data-v-e68641af>点击站点「设置」→「配置文件」，修改 Nginx 配置：</p><div class="dp-code" data-v-e68641af><pre data-v-e68641af><code data-v-e68641af># /www/server/panel/vhost/nginx/quote.conf

server {
    listen 80;
    server_name quote.example.com;  # 改成你的域名
    root /www/wwwroot/quote;        # 站点根目录
    index index.html;

    # 静态资源缓存（assets 带 hash，可长期缓存）
    location /assets/ {
        expires 1y;
        add_header Cache-Control &quot;public, immutable&quot;;
    }

    # SPA 回退（hash 路由其实不需要，但保险加上）
    location / {
        try_files $uri $uri/ /index.html;
    }

    # gzip 压缩
    gzip on;
    gzip_types text/css application/javascript application/json;
    gzip_min_length 1024;
    gzip_comp_level 6;

    # 禁止访问隐藏文件
    location ~ /\\..* {
        deny all;
    }
}</code></pre></div><div class="dp-tip" data-v-e68641af><span class="dp-ic" data-v-e68641af>💡</span><span data-v-e68641af>本项目用 hash 路由（<code data-v-e68641af>#/path</code>），URL 不会发给服务器，所以 <code data-v-e68641af>try_files</code> 其实可省略。但加上更保险，也方便未来切换为 history 模式。</span></div><div class="dp-tip dp-tip-warn" data-v-e68641af><span class="dp-ic" data-v-e68641af>⚠️</span><span data-v-e68641af>修改后点「保存」，然后回到 Nginx 管理页点「重载配置」使修改生效。</span></div>`,5),s(`div`,R,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[6]||=e=>J.value[4].done=e},null,512),[[h,J.value[4].done]]),d[31]||=m(` Nginx 配置已保存并重载`,-1)])])])):u(``,!0),Y.value===5?(r(),c(`div`,z,[d[34]||=p(`<h2 data-v-e68641af>6️⃣ 申请 SSL 证书（HTTPS）</h2><p class="dp-d" data-v-e68641af>宝塔面板免费提供 Let&#39;s Encrypt SSL 证书，一键申请。</p><div class="dp-list" data-v-e68641af><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>1</span> 站点设置 → <b data-v-e68641af>SSL</b> 标签页</div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>2</span> 选择 <b data-v-e68641af>Let&#39;s Encrypt</b> → 勾选域名 → 点击 <b data-v-e68641af>申请</b></div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>3</span> 等待 10-30 秒，显示「成功」即完成</div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>4</span> 开启 <b data-v-e68641af>强制 HTTPS</b> 开关（自动 301 跳转）</div></div><div class="dp-tip dp-tip-warn" data-v-e68641af><span class="dp-ic" data-v-e68641af>⚠️</span><span data-v-e68641af>前提条件：① 域名已解析到服务器 IP ② 阿里云安全组开放 80 和 443 端口 ③ 宝塔面板防火墙也开放 80/443。</span></div><div class="dp-tip" data-v-e68641af><span class="dp-ic" data-v-e68641af>💡</span><span data-v-e68641af>证书有效期 90 天，宝塔会在到期前 7 天自动续签。如自动续签失败，手动重新申请即可。</span></div>`,5),s(`div`,B,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[7]||=e=>J.value[5].done=e},null,512),[[h,J.value[5].done]]),d[33]||=m(` SSL 证书已申请，HTTPS 可访问`,-1)])])])):u(``,!0),Y.value===6?(r(),c(`div`,V,[d[36]||=p(`<h2 data-v-e68641af>7️⃣ 安全组与防火墙</h2><p class="dp-d" data-v-e68641af>阿里云安全组和宝塔防火墙都要开放对应端口。</p><div class="dp-table" data-v-e68641af><div class="dp-th" data-v-e68641af><span data-v-e68641af>端口</span><span data-v-e68641af>用途</span><span data-v-e68641af>安全组</span><span data-v-e68641af>宝塔防火</span></div><div class="dp-tr" data-v-e68641af><span data-v-e68641af><b data-v-e68641af>80</b></span><span data-v-e68641af>HTTP</span><span data-v-e68641af>✅ 开放</span><span data-v-e68641af>✅ 开放</span></div><div class="dp-tr" data-v-e68641af><span data-v-e68641af><b data-v-e68641af>443</b></span><span data-v-e68641af>HTTPS</span><span data-v-e68641af>✅ 开放</span><span data-v-e68641af>✅ 开放</span></div><div class="dp-tr" data-v-e68641af><span data-v-e68641af><b data-v-e68641af>22</b></span><span data-v-e68641af>SSH</span><span data-v-e68641af>✅ 开放</span><span data-v-e68641af>✅ 开放</span></div><div class="dp-tr" data-v-e68641af><span data-v-e68641af><b data-v-e68641af>8888</b></span><span data-v-e68641af>宝塔面板</span><span data-v-e68641af>✅（建议限IP）</span><span data-v-e68641af>✅</span></div></div><div class="dp-list" data-v-e68641af><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>1</span> 阿里云控制台 → ECS → 安全组 → 配置规则 → 添加入方向规则</div><div class="dp-li" data-v-e68641af><span class="dp-num" data-v-e68641af>2</span> 宝塔面板 → 安全 → 放行端口 80/443</div></div>`,4),s(`div`,H,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[8]||=e=>J.value[6].done=e},null,512),[[h,J.value[6].done]]),d[35]||=m(` 端口已开放，外网可访问`,-1)])])])):u(``,!0),Y.value===7?(r(),c(`div`,U,[d[38]||=s(`h2`,null,`8️⃣ 验证访问`,-1),d[39]||=s(`p`,{class:`dp-d`},`浏览器访问你的域名，确认页面正常加载。`,-1),d[40]||=s(`div`,{class:`dp-code`},[s(`pre`,null,[s(`code`,null,`# 验证清单

✅ 访问 https://quote.example.com → 看到首页
✅ 访问 https://quote.example.com/#/dash → 总览首页
✅ 访问 https://quote.example.com/#/qa → AI报价问答库
✅ 访问 https://quote.example.com/#/cockpit → 经营驾驶舱
✅ F12 → Network → JS/CSS 文件 200 OK
✅ F12 → Application → LocalStorage 有数据
✅ HTTP → HTTPS 自动跳转
✅ 页面刷新不 404

# 如有问题排查
curl -I https://quote.example.com         # 看 HTTP 状态码
curl -I https://quote.example.com/assets/  # 看缓存头
nginx -t                                   # SSH 里测 Nginx 配置语法`)])],-1),s(`div`,W,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[9]||=e=>J.value[7].done=e},null,512),[[h,J.value[7].done]]),d[37]||=m(` 全部验证通过`,-1)])])])):u(``,!0),Y.value===8?(r(),c(`div`,G,[d[42]||=s(`h2`,null,`9️⃣ 持续部署（后续更新）`,-1),d[43]||=s(`p`,{class:`dp-d`},`以后每次代码更新，只需重新构建 + 上传即可。`,-1),d[44]||=s(`div`,{class:`dp-code`},[s(`pre`,null,[s(`code`,null,`# 一键部署脚本 deploy.ps1（PowerShell）

$server = "root@你的IP"
$remote = "/www/wwwroot/quote/"

Write-Host "1. 构建..." -ForegroundColor Cyan
npm run build

Write-Host "2. 上传..." -ForegroundColor Cyan
scp -r dist/* $server:$remote

Write-Host "3. 重载 Nginx..." -ForegroundColor Cyan
ssh $server "nginx -s reload"

Write-Host "✅ 部署完成！" -ForegroundColor Green

# 使用：每次改完代码后执行
.\\deploy.ps1`)])],-1),d[45]||=s(`div`,{class:`dp-tip`},[s(`span`,{class:`dp-ic`},`💡`),s(`span`,null,[m(`assets 文件名带 hash（如 `),s(`code`,null,`index-D7VG9FBL.js`),m(`），每次构建自动变化，浏览器会重新下载。旧文件可定期清理 `),s(`code`,null,`rm /www/wwwroot/quote/assets/*.js`),m(`。`)])],-1),s(`div`,K,[s(`label`,null,[l(s(`input`,{type:`checkbox`,"onUpdate:modelValue":d[10]||=e=>J.value[8].done=e},null,512),[[h,J.value[8].done]]),d[41]||=m(` 部署脚本已保存`,-1)])])])):u(``,!0),s(`div`,q,[Y.value>0?(r(),c(`button`,{key:0,class:`dp-nb`,onClick:d[11]||=e=>Y.value--},`← 上一步`)):u(``,!0),d[46]||=s(`div`,{class:`dp-ns`},null,-1),Y.value<J.value.length-1?(r(),c(`button`,{key:1,class:`dp-nb dp-nb-next`,onClick:d[12]||=e=>Y.value++},`下一步 →`)):u(``,!0),Q.value===J.value.length?(r(),c(`button`,{key:2,class:`dp-nb dp-nb-fin`,onClick:d[13]||=e=>Z.value=!0},`🎉 部署完成`)):u(``,!0)])]),Z.value?(r(),c(`div`,{key:0,class:`dp-fin`,onClick:d[16]||=e=>Z.value=!1},[s(`div`,{class:`dp-fin-card`,onClick:d[15]||=g(()=>{},[`stop`])},[d[47]||=s(`div`,{class:`dp-fin-emoji`},`🎉`,-1),d[48]||=s(`h2`,null,`部署成功！`,-1),d[49]||=s(`p`,null,`你的 Vue3 项目已上线阿里云宝塔`,-1),d[50]||=s(`p`,{class:`dp-fin-tip`},[m(`访问地址：`),s(`b`,null,`https://你的域名/#/dash`)],-1),s(`button`,{class:`dp-fin-btn`,onClick:d[14]||=e=>Z.value=!1},`关闭`)])])):u(``,!0)]))}},[[`__scopeId`,`data-v-e68641af`]]);export{J as default};