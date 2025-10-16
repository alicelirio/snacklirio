@echo off
echo ===================================
echo Iniciando Snack Lirio
echo ===================================

echo.
echo [1/3] Iniciando Backend...
cd backend
start "Backend - Porta 3000" cmd /k "npm run dev"
cd ..

timeout /t 3 /nobreak > nul

echo.
echo [2/3] Iniciando Frontend...
start "Frontend - Porta 5173" cmd /k "npm run dev"

echo.
echo [3/3] Servidores iniciados!
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para sair...
pause > nul
