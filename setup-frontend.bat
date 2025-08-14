@echo off
echo Verificando ambiente...

IF EXIST "snack-lirio" (
    echo Pasta snack-lirio encontrada.
    set /p DELETAR="Deseja remover a pasta existente? (S/N): "
    if /i "%DELETAR%"=="S" (
        echo Removendo pasta antiga...
        rmdir /s /q snack-lirio
    ) else (
        echo Operacao cancelada.
        exit /b
    )
)

echo Criando novo projeto frontend...
mkdir snack-lirio
cd snack-lirio
call npm create vite@latest . -- --template react-ts --y
call npm install
call npm install axios react-router-dom
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
echo Projeto frontend criado com sucesso!
pause
