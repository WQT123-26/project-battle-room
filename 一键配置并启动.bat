@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 项目实施作战室 - 一键配置与启动
cd /d "%~dp0"
set "NG=ngrok"

echo ============================================
echo   项目实施作战室 - 一键配置与启动
echo   步骤 1/3 检查 Python
echo   步骤 2/3 启动本地服务 端口 8899
echo   步骤 3/3 内网穿透并显示公网地址
echo ============================================
echo.

REM ---------- 1/3 Python ----------
where python >nul 2>nul
if errorlevel 1 (
    echo [1/3] 未检测到 Python，尝试用 winget 安装...
    winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements
    where python >nul 2>nul
    if errorlevel 1 (
        echo [错误] Python 安装失败，请到 python.org 手动安装后重新运行。
        pause
        exit /b 1
    )
)
echo [1/3] Python 已就绪。
echo.

REM ---------- 2/3 本地服务 ----------
echo [2/3] 启动本地服务（新窗口）...
start "作战室服务-请勿关闭" cmd /k "cd /d "%~dp0" && python server.py 8899"

echo [2/3] 等待服务启动（最多 30 秒）...
set /a TRIES=0
:waitloop
timeout /t 2 /nobreak >nul
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8899/index.html' -TimeoutSec 5; exit 0 } catch { exit 1 }"
if errorlevel 1 (
    set /a TRIES+=1
    if !TRIES! lss 15 goto waitloop
    echo [警告] 服务未响应。请查看"作战室服务"窗口的报错信息，
    echo        常见原因：端口被占用或 server.py 不在本目录。
    echo 是否仍继续启动穿透？[Y/N]
    set /p GOON=
    if /i not "!GOON!"=="Y" pause & exit /b 1
)
echo [2/3] 本地服务已就绪: http://127.0.0.1:8899/index.html#/pmsim
echo.

REM ---------- 3/3 ngrok ----------
if not exist "!NG!\!NG!.exe" (
    echo [3/3] 未检测到 ngrok，正在下载（约 15MB）...
    if not exist !NG! mkdir !NG!
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri 'https://bin.equinox.io/c/bNyj1mQVh4H/ngrok-v3-stable-windows-amd64.zip' -OutFile '!NG!\!NG!.zip'"
    if not exist "!NG!\!NG!.zip" (
        echo [错误] ngrok 下载失败，请检查网络后重新运行本脚本。
        pause
        exit /b 1
    )
    powershell -NoProfile -Command "Expand-Archive -Force -Path '!NG!\!NG!.zip' -DestinationPath '!NG!'"
    del "!NG!\!NG!.zip" >nul 2>nul
)
if not exist "!NG!\!NG!.exe" (
    echo [错误] ngrok 解压失败，请删除 ngrok 文件夹后重新运行。
    pause
    exit /b 1
)

if not exist "!NG!\!NG!.yml" (
    if not exist "%USERPROFILE%\AppData\Local\!NG!\!NG!.yml" (
        echo.
        echo ============================================================
        echo  首次使用 ngrok 需要一个免费的 authtoken：
        echo  1. 打开 dashboard.ngrok.com 注册并登录
        echo  2. 复制页面上 Your Authtoken 那一长串字符
        echo  3. 把它粘贴到下面，然后按回车
        echo ============================================================
        set /p TOKEN=请粘贴你的 authtoken 后按回车:
        if "!TOKEN!"=="" (
            echo [错误] 未输入 authtoken，退出。
            pause
            exit /b 1
        )
        !NG!\!NG!.exe config add-authtoken !TOKEN!
        echo !TOKEN!> "!NG!\!NG!.yml"
    )
)

echo [3/3] 正在启动内网穿透...
start "穿透窗口-公网地址在这里-请勿关闭" cmd /k "cd /d "%~dp0" && !NG!\!NG!.exe http 8899 --log stdout"

echo 正在获取公网地址...
set "PUBURL="
set /a T2=0
:getaddr
timeout /t 3 /nobreak >nul
for /f "delims=" %%A in ('powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:4040/api/tunnels' -TimeoutSec 5; $j = $r.Content ^| ConvertFrom-Json; $j.tunnels[0].public_url } catch { '' }"') do set PUBURL=%%A
if "!PUBURL!"=="" (
    set /a T2+=1
    if !T2! lss 10 goto getaddr
    echo [警告] 未取到公网地址，请查看"穿透窗口"是否报错。
) else (
    echo.
    echo ============================================================
    echo   部署成功！你的公网地址：
    echo   !PUBURL!/index.html#/pmsim
    echo   访客监控后台：http://127.0.0.1:8899/admin/logs
    echo   （账号 admin 密码 pmsim2026，上线前请修改默认密码）
    echo   保持两个黑色窗口开启，公网地址才有效。
    echo ============================================================
)
echo.
echo 本窗口可以关闭。浏览器即将打开公网页面（如取到地址）...
if not "!PUBURL!"=="" start "" "!PUBURL!/index.html#/pmsim"
pause
