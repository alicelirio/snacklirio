@echo off
cd /d "%USERPROFILE%\Desktop\tcc-3C-alice"
IF NOT EXIST "snack-lirio" (
    mkdir snack-lirio
    cd snack-lirio
    echo Criando novo projeto...
    call npm create vite@latest . -- --template react-ts
    call npm install
    cd ..
) ELSE (
    echo Pasta já existe!
)
