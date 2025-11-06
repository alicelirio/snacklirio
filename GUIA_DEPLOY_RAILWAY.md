# 🚂 GUIA COMPLETO - DEPLOY BACKEND NO RAILWAY

## 📋 O QUE VAMOS FAZER

Colocar o **backend (API Node.js)** online no Railway para que o frontend no Vercel consiga se comunicar com ele.

**Tempo estimado:** 10-15 minutos

---

## 🎯 PASSO A PASSO DETALHADO

### 1️⃣ CRIAR CONTA NO RAILWAY (2 minutos)

1. Acesse: **https://railway.app**
2. Clique em **"Login"** ou **"Start a New Project"**
3. Escolha: **"Login with GitHub"**
4. Faça login com sua conta GitHub (alicelirio)
5. Autorize o Railway a acessar seus repositórios

**💡 IMPORTANTE:** Railway oferece $5 de crédito grátis por mês (suficiente para o projeto!)

---

### 2️⃣ CRIAR NOVO PROJETO (3 minutos)

1. No painel do Railway, clique em: **"New Project"**
2. Escolha: **"Deploy from GitHub repo"**
3. Procure e selecione: **`alicelirio/snacklirio`**
4. O Railway vai detectar automaticamente que é um projeto Node.js

---

### 3️⃣ CONFIGURAR O SERVIÇO (5 minutos)

Após importar, o Railway vai criar um serviço. Agora precisamos configurar:

#### **A) Definir Root Directory:**

1. Clique no serviço que foi criado
2. Vá em **"Settings"** (Configurações)
3. Procure por **"Root Directory"** ou **"Source"**
4. Configure para: `snack-lirio/backend`
5. Clique em **"Save"** ou pressione Enter

#### **B) Configurar Variáveis de Ambiente:**

1. Ainda em **"Settings"**, procure por **"Variables"** ou **"Environment Variables"**
2. Clique em **"New Variable"** ou **"+ Add Variable"**
3. Adicione as seguintes variáveis:

```env
DATABASE_URL=mysql://lice-lirio_snack-lirio:SuaSenha@mysql-lice-lirio.alwaysdata.net/lice-lirio_snack-lirio

JWT_SECRET=sua_chave_secreta_aqui_mude_isso_em_producao

PORT=3000

NODE_ENV=production

CORS_ORIGIN=https://snacklirio.vercel.app
```

**⚠️ ATENÇÃO:**
- Troque `SuaSenha` pela senha real do seu banco MySQL (AlwaysData)
- Troque `sua_chave_secreta_aqui_mude_isso_em_producao` por uma chave forte (ex: `snacklirio2024@secretkey`)
- A URL do CORS_ORIGIN deve ser a URL do seu frontend no Vercel

#### **C) Configurar Build e Start:**

1. Ainda em **"Settings"**, procure por **"Build Command"** e **"Start Command"**
2. Configure assim:

**Build Command:**
```bash
npm install && npx prisma generate
```

**Start Command:**
```bash
npm start
```

3. Clique em **"Save"** ou **"Deploy"**

---

### 4️⃣ FAZER O DEPLOY (2 minutos)

1. Volte para a aba principal do projeto
2. O Railway vai iniciar o deploy automaticamente
3. Aguarde 2-3 minutos enquanto ele:
   - Instala dependências
   - Gera o Prisma Client
   - Inicia o servidor

4. Quando aparecer **"Success"** ou **"Active"**, está pronto! 🎉

---

### 5️⃣ OBTER A URL DA API (1 minuto)

1. No painel do serviço, procure por **"Settings"** → **"Networking"** ou **"Domains"**
2. Clique em **"Generate Domain"** se não tiver uma URL ainda
3. Copie a URL gerada (será algo como: `https://snacklirio-production.up.railway.app`)

**📋 Salve essa URL! Vamos usar no próximo passo.**

---

### 6️⃣ TESTAR A API (2 minutos)

Abra no navegador a URL da sua API com `/health` no final:

```
https://sua-api.railway.app/health
```

**Se aparecer algo como:**
```json
{"status":"ok","timestamp":"..."}
```

✅ **Significa que está funcionando!**

Se não tiver essa rota, teste:
```
https://sua-api.railway.app/api/auth/test
```

Ou simplesmente abra a URL base e veja se não dá erro 404 (é normal não ter conteúdo na rota raiz).

---

### 7️⃣ ATUALIZAR O FRONTEND NO VERCEL (5 minutos)

Agora vamos conectar o frontend com o backend!

1. Volte para o **Vercel** (vercel.com)
2. Abra o projeto **"snacklirio"**
3. Vá em **"Settings"** → **"Environment Variables"**
4. Procure pela variável **`VITE_API_URL`**
5. Clique em **"Edit"** ou **"Delete"** e adicione novamente:

```
Nome: VITE_API_URL
Valor: https://sua-api.railway.app
```

**⚠️ IMPORTANTE:** Use a URL que o Railway gerou (sem barra / no final)

6. Clique em **"Save"**
7. Vá em **"Deployments"** (Implantações)
8. Clique nos **3 pontinhos** (...) do último deploy
9. Clique em **"Redeploy"**
10. Aguarde 2-3 minutos

---

### 8️⃣ TESTAR O SISTEMA COMPLETO (3 minutos)

1. Abra seu site: `https://snacklirio.vercel.app`
2. Tente fazer **login** com:
   - Email: `admin@admin.com`
   - Senha: `admin123`

3. Se entrar no sistema, **FUNCIONOU!** 🎉🎉🎉

---

## ✅ CHECKLIST DO DEPLOY BACKEND

- [ ] Conta Railway criada
- [ ] Projeto importado do GitHub
- [ ] Root Directory configurado (`snack-lirio/backend`)
- [ ] Variáveis de ambiente adicionadas (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] Deploy realizado com sucesso
- [ ] URL da API gerada
- [ ] API testada e funcionando
- [ ] Frontend atualizado com nova VITE_API_URL
- [ ] Frontend redeployado
- [ ] Login funcionando no site online

---

## 🔧 CONFIGURAÇÃO COMPLETA DAS VARIÁVEIS

Aqui está a lista completa para você copiar e colar:

```env
DATABASE_URL=mysql://lice-lirio_snack-lirio:SuaSenhaAqui@mysql-lice-lirio.alwaysdata.net/lice-lirio_snack-lirio

JWT_SECRET=snacklirio2024@secretkey@railway

PORT=3000

NODE_ENV=production

CORS_ORIGIN=https://snacklirio.vercel.app
```

**🔐 Lembre-se de trocar:**
- `SuaSenhaAqui` pela senha real do MySQL
- `snacklirio2024@secretkey@railway` por uma chave forte e única

---

## 🐛 PROBLEMAS COMUNS

### "Build failed" ou "Error installing dependencies"
**Solução:** 
- Verificar se o Root Directory está correto: `snack-lirio/backend`
- Verificar se existe `package.json` na pasta backend

### "Prisma error: Could not connect to database"
**Solução:**
- Verificar se a DATABASE_URL está correta
- Testar conexão no AlwaysData
- Verificar se o MySQL está ativo

### "CORS error" no frontend
**Solução:**
- Verificar se CORS_ORIGIN está correto no Railway
- Adicionar a URL exata do Vercel (sem / no final)

### "Cannot find module 'express'"
**Solução:**
- Verificar se o Build Command está correto: `npm install && npx prisma generate`
- Tentar redeploy

### "Login não funciona"
**Solução:**
- Verificar se a VITE_API_URL no Vercel está correta
- Verificar se fez redeploy no Vercel após mudar a variável
- Abrir DevTools (F12) e ver erros no Console

---

## 📊 MONITORAMENTO

### Ver Logs no Railway:

1. Clique no serviço
2. Vá em **"Deployments"**
3. Clique no deploy ativo
4. Veja os **"Logs"** em tempo real

Isso ajuda a debugar problemas!

---

## 💰 CUSTOS

**Railway - Plano Hobby:**
- ✅ $5 de crédito grátis por mês
- ✅ Suficiente para projetos pequenos/médios
- ✅ Não precisa cartão de crédito inicialmente

**Vercel - Plano Hobby:**
- ✅ 100% grátis
- ✅ Ilimitado para projetos pessoais

**AlwaysData - MySQL:**
- ✅ Você já tem configurado
- ✅ Plano grátis suficiente

**💡 Total: GRÁTIS!** (Usando créditos gratuitos)

---

## 🔄 ATUALIZAR O BACKEND DEPOIS

Quando você fizer mudanças no código do backend:

1. Faça commit e push para o GitHub:
```bash
git add .
git commit -m "feat: Nova funcionalidade"
git push origin main
```

2. O Railway vai fazer **redeploy automático**! 🚀

3. Não precisa fazer nada no Vercel (só se mudar variáveis de ambiente)

---

## 🎯 RESUMO RÁPIDO

```bash
1. Criar conta no Railway (railway.app)
2. New Project → Deploy from GitHub → snacklirio
3. Root Directory: snack-lirio/backend
4. Adicionar variáveis: DATABASE_URL, JWT_SECRET, PORT, NODE_ENV, CORS_ORIGIN
5. Build: npm install && npx prisma generate
6. Start: npm start
7. Deploy!
8. Copiar URL gerada
9. Atualizar VITE_API_URL no Vercel
10. Redeploy frontend
11. Testar login!
```

**Tempo total:** ~15 minutos

---

## 📞 PRÓXIMOS PASSOS

Depois que tudo estiver funcionando:

1. ✅ Tirar prints do sistema para o TCC
2. ✅ Gravar vídeo demonstrativo
3. ✅ Testar todas as funcionalidades online
4. ✅ Mostrar para a professora/orientador

---

## 🎉 PARABÉNS!

Quando tudo estiver funcionando, você terá:

- ✅ Frontend online no Vercel
- ✅ Backend online no Railway
- ✅ Banco de dados MySQL no AlwaysData
- ✅ Sistema completo acessível pela internet
- ✅ Pronto para apresentar no TCC!

**Boa sorte!** 🚀

---

**💬 Dica:** Se tiver qualquer erro, me mande:
1. Print da tela
2. Logs do Railway
3. Mensagem de erro do navegador (F12 → Console)
