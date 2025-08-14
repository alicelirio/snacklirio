@echo off
echo Criando projeto backend...
cd snack-lirio
mkdir backend
cd backend
call npm init -y
call npm install express cors dotenv jsonwebtoken bcryptjs @prisma/client
call npm install -D typescript ts-node-dev @types/express @types/cors @types/jsonwebtoken @types/bcryptjs prisma
call npx tsc --init
echo Projeto backend criado com sucesso!
pause
