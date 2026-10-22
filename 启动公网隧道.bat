@echo off
setlocal enabledelayedexpansion
title Battle Room - Public Tunnel (Serveo)
cd /d "%~dp0"

echo ============================================================
echo   Project Battle Room - Public Tunnel
echo   Step 1/2 Ensure local service on 8899
echo   Step 2/2 Open SSH tunnel and show public URL
echo ============================================================
echo.

REM ---------- 1/2 本地服务 ----------
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 8899 -State Listen -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"
if errorlevel 1 (
    echo [1/2] Starting local service in a new window...
    start "BattleRoom-Service-DO-NOT-CLOSE" cmd /k "cd /d "%~dp0" && python server.py 8899"
    timeout /t 3 /nobreak >nul
) else (
    echo [1/2] Local service already running on port 8899.
)

powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8899/index.html' -TimeoutSec 5 | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
    echo [ERROR] Local service is not responding. Check the BattleRoom-Service window.
    pause
    exit /b 1
)
echo [1/2] Local service OK: http://127.0.0.1:8899/index.html#/pmsim
echo.

REM ---------- 2/2 SSH 隧道 ----------
echo [2/2] Starting SSH tunnel via serveo.net (FIXED subdomain)...
echo       Public page  : https://zhandoushi.serveousercontent.com/index.html#/pmsim
echo       Admin  login : admin / Wqt158205
echo       Keep BOTH black windows open or the URL stops working.
echo.

start "BattleRoom-Tunnel-FIXED-URL-DO-NOT-CLOSE" cmd /k ""%SystemRoot%\System32\OpenSSH\ssh.exe" -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -o ExitOnForwardFailure=yes -T -n -R zhandoushi:80:localhost:8899 serveo.net"

echo Tunnel window opened. Fixed URL: https://zhandoushi.serveousercontent.com/index.html#/pmsim
pause
