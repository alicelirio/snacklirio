#!/bin/sh
set -e
echo "[start.sh] Entrando na pasta backend"
cd snack-lirio/backend
echo "[start.sh] Instalando dependências"
npm install
echo "[start.sh] Gerando Prisma Client"
npx prisma generate
echo "[start.sh] Build TypeScript"
npm run build
echo "[start.sh] Iniciando servidor"
npm start