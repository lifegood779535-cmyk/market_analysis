@echo off
echo ==========================================
echo   TradeGuru - Starting Full Stack App
echo ==========================================
echo.

echo [1/2] Starting Python-Free Node.js Backend...
start "TradeGuru Backend" cmd /k "cd /d %~dp0backend && node server.js"

echo [2/2] Starting React Frontend...
start "TradeGuru Frontend" cmd /k "cd /d %~dp0silly-ocelot-burst-main && npm run dev"

echo.
echo Both servers starting up!
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:8080
echo.
