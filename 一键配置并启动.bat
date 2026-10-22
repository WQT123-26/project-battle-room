@echo off
setlocal enabledelayedexpansion
title Battle Room - One Click Setup and Launch
cd /d "%~dp0"
set "NG=ngrok"

echo ============================================
echo   Project Battle Room - One Click Setup
echo   Step 1/3 Check Python
echo   Step 2/3 Start local service on port 8899
echo   Step 3/3 Tunnel and show public URL
echo ============================================
echo.

REM ---------- 1/3 Python ----------
where python >nul 2>nul
if errorlevel 1 (
    echo [1/3] Python not found. Trying winget install...
    winget install -e --id Python.Python.3.12 --accept-source-agreements --accept-package-agreements
    where python >nul 2>nul
    if errorlevel 1 (
        echo [ERROR] Python install failed. Install from python.org manually, then run again.
        pause
        exit /b 1
    )
)
echo [1/3] Python is ready.
echo.

REM ---------- 2/3 Local service ----------
echo [2/3] Starting local service in a new window...
start "BattleRoom-Service-DO-NOT-CLOSE" cmd /k "cd /d "%~dp0" && python server.py 8899"

echo [2/3] Waiting for service (up to 30 seconds)...
set /a TRIES=0
:waitloop
timeout /t 2 /nobreak >nul
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8899/index.html' -TimeoutSec 5; exit 0 } catch { exit 1 }"
if errorlevel 1 (
    set /a TRIES+=1
    if !TRIES! lss 15 goto waitloop
    echo [WARN] Service not responding. Check the BattleRoom-Service window for errors.
    echo        Common causes: port 8899 occupied, or server.py not in this folder.
    choice /c YN /m "Continue with tunnel anyway?"
    if errorlevel 2 pause & exit /b 1
)
echo [2/3] Local service is ready: http://127.0.0.1:8899/index.html#/pmsim
echo.

REM ---------- 3/3 ngrok ----------
if not exist "!NG!\!NG!.exe" (
    echo [3/3] ngrok not found. Downloading about 15MB via PowerShell...
    if not exist !NG! mkdir !NG!
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri 'https://bin.equinox.io/c/bNyj1mQVh4H/ngrok-v3-stable-windows-amd64.zip' -OutFile '!NG!\!NG!.zip'"
    if not exist "!NG!\!NG!.zip" (
        echo [ERROR] ngrok download failed. Check network and run again.
        pause
        exit /b 1
    )
    powershell -NoProfile -Command "Expand-Archive -Force -Path '!NG!\!NG!.zip' -DestinationPath '!NG!'"
    del "!NG!\!NG!.zip" >nul 2>nul
)
if not exist "!NG!\!NG!.exe" (
    echo [ERROR] ngrok unzip failed. Delete the ngrok folder and run again.
    pause
    exit /b 1
)

if not exist "!NG!\!NG!.yml" (
    if not exist "%USERPROFILE%\AppData\Local\!NG!\!NG!.yml" (
        echo.
        echo ============================================================
        echo  First time using ngrok. A free authtoken is required:
        echo  1. Open https://dashboard.ngrok.com and sign in
        echo  2. Copy the token string shown under "Your Authtoken"
        echo  3. Paste it below, then press Enter
        echo ============================================================
        set /p TOKEN=Paste your authtoken then press Enter:
        if "!TOKEN!"=="" (
            echo [ERROR] No authtoken entered. Exit.
            pause
            exit /b 1
        )
        !NG!\!NG!.exe config add-authtoken !TOKEN!
        echo !TOKEN!> "!NG!\!NG!.yml"
    )
)

echo [3/3] Starting tunnel...
start "Tunnel-Window-Public-URL-Here-DO-NOT-CLOSE" cmd /k "cd /d "%~dp0" && !NG!\!NG!.exe http 8899 --log stdout"

echo Getting public URL...
set "PUBURL="
set /a T2=0
:getaddr
timeout /t 3 /nobreak >nul
for /f "delims=" %%A in ('powershell -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:4040/api/tunnels' -TimeoutSec 5; $j = $r.Content ^| ConvertFrom-Json; $j.tunnels[0].public_url } catch { '' }"') do set PUBURL=%%A
if "!PUBURL!"=="" (
    set /a T2+=1
    if !T2! lss 10 goto getaddr
    echo [WARN] No public URL captured. Check the Tunnel window for errors.
) else (
    echo.
    echo ============================================================
    echo   SUCCESS! Your public URL:
    echo   !PUBURL!/index.html#/pmsim
    echo   Visitor monitor: http://127.0.0.1:8899/admin/logs
    echo   Login: admin / pmsim2026  (change the default password!)
    echo   Keep BOTH black windows open or the URL will stop working.
    echo ============================================================
)
echo.
echo You can close this window. Opening the public page in your browser...
if not "!PUBURL!"=="" start "" "!PUBURL!/index.html#/pmsim"
pause
