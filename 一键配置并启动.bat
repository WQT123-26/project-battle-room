@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 项目实施作战室 · 一键配置与启动（长期稳定地址）
cd /d "%~dp0"

echo ================================================
echo   项目实施作战室 · 一键配置与启动
echo   [1/3] 检查并安装 Python
echo   [2/3] 启动本地服务（页面+实时拉取+访客监控）
echo   [3/3] 自动配置内网穿透并显示公网地址
echo ================================================
echo.@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 项目实施作战室 - 一键配置与启动
cd /d "%~dp0"

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
        echo [错误] Python 安装失败，请到 https://www.python.org/downloads/ 手动安装后重新运行。
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
    echo        常见原因：端口被占用（改用其他端口）、server.py 不在本目录。
    echo 是否仍继续启动穿透？[Y/N]
    set /p GOON=
    if /i not "!GOON!"=="Y" pause & exit /b 1
)
echo [2/3] 本地服务已就绪: http://127.0.0.1:8899/index.html#/pmsim
echo.

REM ---------- 3/3 ngrok ----------
if not exist "ngrok\ngrok.exe" (
    echo [3/3] 未检测到 ngrok，正在下载（约 15MB，用 PowerShell 下载更稳定）...
    if not exist ngrok mkdir ngrok
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri 'https://bin.equinox.io/c/bNyj1mQVh4H/ngrok-v3-stable-windows-amd64.zip' -OutFile 'ngrok\ngrok.zip'"
    if not exist "ngrok\ngrok.zip" (
        echo [错误] ngrok 下载失败，请检查网络后重新运行本脚本。
        pause
        exit /b 1
    )
    powershell -NoProfile -Command "Expand-Archive -Force -Path 'ngrok\ngrok.zip' -DestinationPath 'ngrok'"
    del "ngrok\ngrok.zip" >nul 2>nul
)
if not exist "ngrok\ngrok.exe" (
    echo [错误] ngrok 解压失败，请删除 ngrok 文件夹后重新运行。
    pause
    exit /b 1
)

if not exist "ngrok\ngrok.yml" (
    if not exist "%USERPROFILE%\AppData\Local\ngrok\ngrok.yml" (
        echo.
        echo ============================================================
        echo  首次使用 ngrok 需要一个免费的 authtoken：
        echo  1. 打开 https://dashboard.ngrok.com 注册并登录
        echo  2. 复制页面上 "Your Authtoken" 那一长串字符
        echo  3. 把它粘贴到下面，然后按回车
        echo ============================================================
        set /p TOKEN=请粘贴你的 authtoken 后按回车:
        if "!TOKEN!"=="" (
            echo [错误] 未输入 authtoken，退出。
            pause
            exit /b 1
        )
        ngrok\ngrok.exe config add-authtoken !TOKEN!
        echo !TOKEN!> ngrok\ngrok.yml
    )
)

echo [3/3] 正在启动内网穿透...
start "穿透窗口-公网地址在这里-请勿关闭" cmd /k "cd /d "%~dp0" && ngrok\ngrok.exe http 8899 --log stdout"

echo 正在获取公网地址...
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
    echo   部署成功！你的公网地址：@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 项目实施作战室 - 一键配置与启动
cd /d "%~dp0"

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
        echo [错误] Python 安装失败，请到 https://www.python.org/downloads/ 手动安装后重新运行。
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
    echo        常见原因：端口被占用（改用其他端口）、server.py 不在本目录。
    echo 是否仍继续启动穿透？[Y/N]
    set /p GOON=
    if /i not "!GOON!"=="Y" pause & exit /b 1
)
echo [2/3] 本地服务已就绪: http://127.0.0.1:8899/index.html#/pmsim
echo.

REM ---------- 3/3 ngrok ----------
if not exist "ngrok\ngrok.exe" (
    echo [3/3] 未检测到 ngrok，正在下载（约 15MB，用 PowerShell 下载更稳定）...
    if not exist ngrok mkdir ngrok
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri 'https://bin.equinox.io/c/bNyj1mQVh4H/ngrok-v3-stable-windows-amd64.zip' -OutFile 'ngrok\ngrok.zip'"
    if not exist "ngrok\ngrok.zip" (
        echo [错误] ngrok 下载失败，请检查网络后重新运行本脚本。
        pause
        exit /b 1
    )
    powershell -NoProfile -Command "Expand-Archive -Force -Path 'ngrok\ngrok.zip' -DestinationPath 'ngrok'"
    del "ngrok\ngrok.zip" >nul 2>nul
)
if not exist "ngrok\ngrok.exe" (
    echo [错误] ngrok 解压失败，请删除 ngrok 文件夹后重新运行。
    pause
    exit /b 1
)

if not exist "ngrok\ngrok.yml" (
    if not exist "%USERPROFILE%\AppData\Local\ngrok\ngrok.yml" (
        echo.
        echo ============================================================
        echo  首次使用 ngrok 需要一个免费的 authtoken：
        echo  1. 打开 https://dashboard.ngrok.com 注册并登录
        echo  2. 复制页面上 "Your Authtoken" 那一长串字符
        echo  3. 把它粘贴到下面，然后按回车
        echo ============================================================
        set /p TOKEN=请粘贴你的 authtoken 后按回车:
        if "!TOKEN!"=="" (
            echo [错误] 未输入 authtoken，退出。
            pause
            exit /b 1
        )
        ngrok\ngrok.exe config add-authtoken !TOKEN!
        echo !TOKEN!> ngrok\ngrok.yml
    )
)

echo [3/3] 正在启动内网穿透...
start "穿透窗口-公网地址在这里-请勿关闭" cmd /k "cd /d "%~dp0" && ngrok\ngrok.exe http 8899 --log stdout"

echo 正在获取公网地址...
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


REM ============ 1) Python 检查与自动安装 ============
set PY=
where python >nul 2>nul && set PY=python
if not defined PY where py >nul 2>nul && set PY=py
if not defined PY (
  echo [1/3] 未检测到 Python，正在尝试用 winget 自动安装（约 1-2 分钟）...
  winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements
  where python >nul 2>nul && set PY=python
  if not defined PY where py >nul 2>nul && set PY=py
)
if not defined PY (
  echo.
  echo [错误] Python 自动安装失败。请手动安装：
  echo        打开 https://www.python.org/downloads/ 下载安装，
  echo        安装时务必勾选 "Add Python to PATH"，然后重新运行本脚本。
  start https://www.python.org/downloads/
  pause
  exit /b 1
)
echo [1/3] Python 已就绪（!PY!）
echo.

REM ============ 2) 启动本地服务 ============
echo [2/3] 启动本地服务（端口 8899）...
start "作战室服务-关闭此窗口即停止服务" cmd /c "!PY! server.py 8899"
timeout /t 3 >nul
curl -s -m 5 -o nul http://localhost:8899/index.html
if errorlevel 1 (
  echo [警告] 服务未响应，请查看"作战室服务"窗口的报错信息。
) else (
  echo [2/3] 本地服务已运行: http://localhost:8899/index.html#/pmsim
)
echo.

REM ============ 3) 内网穿透 ============
set TUNNEL=
where cpolar >nul 2>nul && set TUNNEL=cpolar
if not defined TUNNEL where ngrok >nul 2>nul && set TUNNEL=ngrok
if not defined TUNNEL if exist "%~dp0ngrok.exe" set TUNNEL=ngrok
if not defined TUNNEL if exist "%~dp0cpolar.exe" set TUNNEL=cpolar

if not defined TUNNEL (
  echo [3/3] 未检测到穿透工具，正在自动下载 ngrok（约 5-10 MB）...
  curl -L -m 120 -o ngrok.zip https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip
  if not exist ngrok.zip (
    powershell -Command "Invoke-WebRequest -Uri 'https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip' -OutFile 'ngrok.zip'"
  )
  if not exist ngrok.zip (
    echo [错误] 下载失败，请手动到 https://ngrok.com/download 下载并放到本目录。
    pause
    exit /b 1
  )
  tar -xf ngrok.zip >nul 2>nul
  if not exist ngrok.exe powershell -Command "Expand-Archive -Force ngrok.zip ."
  del ngrok.zip >nul 2>nul
  set TUNNEL=ngrok
)
echo [3/3] 穿透工具: !TUNNEL!

if "!TUNNEL!"=="ngrok" (
  if not exist "%~dp0ngrok.yml" (
    echo.
    set /p TOKEN=首次使用 ngrok，请输入 authtoken（在 https://dashboard.ngrok.com 免费注册获取）:
    if not "!TOKEN!"=="" ngrok config add-authtoken !TOKEN!
  )
  start "ngrok 隧道-关闭此窗口即断开公网" cmd /c "ngrok http 8899"
)
if "!TUNNEL!"=="cpolar" (
  start "cpolar 隧道-关闭此窗口即断开公网" cmd /c "cpolar http 8899"
)

echo.
echo 正在获取公网地址（约 6 秒）...
timeout /t 6 >nul
powershell -Command "try{$t=(Invoke-RestMethod http://127.0.0.1:4040/api/tunnels).tunnels|Where-Object{$_.proto -eq 'https'}|Select-Object -First 1;Write-Host '';Write-Host '========================================';Write-Host ('  公网地址: '+$t.public_url);Write-Host '========================================';Write-Host '  把上面的地址发给访客即可访问'}catch{Write-Host '未自动获取到地址，请打开 http://127.0.0.1:4040 页面查看 Forwarding 行的公网地址'}"

echo.
echo 正在打开浏览器（本地页面 + 隧道管理页）...
start "" "http://localhost:8899/index.html#/pmsim"
start "" "http://127.0.0.1:4040"
echo.
echo [完成] 访客监控后台: http://localhost:8899/admin/logs  (admin / pmsim2026，上线前请修改)
echo [提示] 保持本窗口和两个命令行窗口开启，公网地址才有效。
pause
