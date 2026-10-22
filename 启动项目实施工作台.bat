@echo off
chcp 65001 >nul
title 项目实施工作台 · 一键启动
echo ================================================
echo   项目实施工作台 · 本地完整镜像
echo   静态页面 + 拉取代理网关 一体化服务
echo ================================================
cd /d "%~dp0"
set PORT=8899

where python >nul 2>nul
if %errorlevel%==0 (
  echo 正在启动服务 http://localhost:%PORT%/ ...
  start "" http://localhost:%PORT%/index.html#/pmsim
  python server.py %PORT%
  goto :eof
)

where py >nul 2>nul
if %errorlevel%==0 (
  echo 正在启动服务 http://localhost:%PORT%/ ...
  start "" http://localhost:%PORT%/index.html#/pmsim
  py server.py %PORT%
  goto :eof
)

echo [错误] 未检测到 Python。
echo 请安装 Python（https://www.python.org 下载，安装时勾选 Add to PATH），
echo 或直接双击 index.html（部分浏览器可能因 ES Module 限制白屏）。
pause
