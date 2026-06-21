@echo off
chcp 65001 >nul
title ROBOT UPRISING - Portfolio Server
cd /d "%~dp0"

echo ============================================
echo   ROBOT UPRISING - Portfolio
echo   로컬 서버를 시작합니다...
echo ============================================
echo.
echo  브라우저가 자동으로 열립니다.
echo  종료하려면 이 창을 닫으세요.
echo.

start "" http://localhost:8000/index.html

py -m http.server 8000
if errorlevel 1 (
  python -m http.server 8000
)
pause
