# 🚀 Guia Completo de Deploy - Snack Lírio

**Pré-requisito:** Sistema funcionando localmente (frontend + backend testados)

---

## 📋 Checklist Pré-Deploy

Antes de fazer deploy, certifique-se de que tudo funciona localmente:

- [ ] Backend rodando em http://localhost:3000
- [ ] Frontend rodando em http://localhost:5173
- [ ] Login e registro funcionando
- [ ] CRUD de produtos funcionando (fornecedor)
- [ ] Upload de imagem funcionando
- [ ] Carrinho e checkout funcionando
- [ ] Admin consegue atualizar status de pedido
- [ ] Sem erros no console do navegador
- [ ] Sem erros no terminal do backend

---

## 🎯 Ordem de Deploy Recomendada

1. **Backend primeiro** (Render/Railway) → Obter URL da API
2. **Frontend depois** (Vercel) → Configurar com URL do backend
3. **Testes finais** → Validar tudo em produção

---

# 1️⃣ Deploy do Backend (Render)

## Por que Render?
- ✅ Gratuito para começar
- ✅ PostgreSQL incluído (grátis)
- ✅ Deploy automático via GitHub
- ✅ SSL/HTTPS automático
- ✅ Fácil de usar

## Passo a Passo

### 1.1 Preparar o Código

**a) Criar arquivo `backend/.env.example`**

```bash
cd snack-lirio/backend
```

Criar arquivo `.env.example`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="sua-chave-secreta-de-pelo-menos-32-caracteres"
PORT=3000
CORS_ORIGIN="https://seu-frontend.vercel.app"
```

**b) Ajustar `backend/package.json`**

Adicionar script de start para produção:

```json
{
  "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "postinstall": "prisma generate"
  }
}
```

**c) Criar `backend/render.yaml` (opcional, mas recomendado)**

```yaml
services:
  - type: web
    name: snacklirio-api
    env: node
    buildCommand: npm install && npm run build && npx prisma migrate deploy
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: snacklirio-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: PORT
        value: 3000

databases:
  - name: snacklirio-db
    databaseName: snacklirio
    plan: free
```

**d) Commitar mudanças**

```bash
git add .
git commit -m "chore: preparar backend para deploy no Render"
git push
```

### 1.2 Criar Conta no Render

1. Acesse: https://render.com
2. Clique em **"Get Started"**
3. Conecte com GitHub
4. Autorize acesso ao repositório `snacklirio`

### 1.3 Criar PostgreSQL Database

1. No dashboard do Render, clique **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `snacklirio-db`
   - **Database:** `snacklirio`
   - **User:** (gerado automaticamente)
   - **Region:** escolha o mais próximo (US East ou Frankfurt)
   - **Plan:** **Free**
3. Clique **"Create Database"**
4. Aguarde provisionar (~2 min)
5. **Copie a "Internal Database URL"** (você vai precisar)

### 1.4 Criar Web Service (Backend)

1. No dashboard, clique **"New +"** → **"Web Service"**
2. Conecte ao repositório GitHub `snacklirio`
3. Configure:
   - **Name:** `snacklirio-api`
   - **Region:** mesma do banco (ex: Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** `snack-lirio/backend`
   - **Runtime:** `Node`
   - **Build Command:** 
     ```
     npm install && npm run build && npx prisma migrate deploy
     ```
   - **Start Command:**
     ```
     npm start
     ```
   - **Plan:** **Free**

4. Clique em **"Advanced"** e adicione **Environment Variables**:

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Cole a Internal Database URL copiada antes |
   | `JWT_SECRET` | Gere uma chave forte: https://randomkeygen.com (Fort Knox Password) |
   | `PORT` | `3000` |
   | `NODE_ENV` | `production` |

5. Clique **"Create Web Service"**

6. Aguarde o deploy (~5-10 min na primeira vez)

### 1.5 Verificar Deploy

1. Quando terminar, você terá uma URL tipo: `https://snacklirio-api.onrender.com`
2. Teste os endpoints:
   - Abra no navegador: `https://snacklirio-api.onrender.com/products`
   - Deve retornar `[]` (array vazio) ou lista de produtos

3. **⚠️ IMPORTANTE:** Copie essa URL, você vai usar no frontend!

### 1.6 Configurar CORS para o Frontend

**Depois que o frontend estiver deployado**, volte aqui e atualize:

No Render, vá em **Environment** e adicione/edite:
- `CORS_ORIGIN` = `https://seu-app.vercel.app` (URL do frontend deployado)

Ou edite `backend/src/server.ts` para usar variável:

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

Commite e o Render fará redeploy automático.

---

# 2️⃣ Deploy do Frontend (Vercel)

## Por que Vercel?
- ✅ Gratuito para projetos pessoais
- ✅ Deploy automático via GitHub
- ✅ CDN global ultra-rápido
- ✅ SSL/HTTPS automático
- ✅ Preview deployments para PRs
- ✅ Otimizado para Vite/React

## Passo a Passo

### 2.1 Preparar o Código

**a) Criar `snack-lirio/.env.production`**

```env
VITE_API_URL=https://snacklirio-api.onrender.com
```

⚠️ **Substitua pela URL real do seu backend no Render!**

**b) Verificar `vite.config.ts`**

Deve estar assim:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

**c) Testar build local**

```bash
cd snack-lirio
npm run build
npm run preview
```

Acesse http://localhost:4173 e teste se tudo funciona (vai dar erro de API se backend não estiver no ar, ok por enquanto).

**d) Commitar**

```bash
git add .
git commit -m "chore: preparar frontend para deploy na Vercel"
git push
```

### 2.2 Criar Conta na Vercel

1. Acesse: https://vercel.com
2. Clique **"Sign Up"**
3. Conecte com GitHub
4. Autorize acesso aos repositórios

### 2.3 Importar Projeto

1. No dashboard da Vercel, clique **"Add New..." → "Project"**
2. Selecione o repositório `snacklirio`
3. Clique **"Import"**

### 2.4 Configurar Build

1. **Framework Preset:** Vite
2. **Root Directory:** `snack-lirio` (clique em Edit e selecione a pasta)
3. **Build Command:** `npm run build` (já preenchido)
4. **Output Directory:** `dist` (já preenchido)
5. **Install Command:** `npm install`

### 2.5 Adicionar Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://snacklirio-api.onrender.com` |

⚠️ **Use a URL real do seu backend!**

### 2.6 Deploy

1. Clique **"Deploy"**
2. Aguarde o build (~3-5 min)
3. Quando terminar, você terá uma URL tipo: `https://snacklirio.vercel.app`

### 2.7 Configurar Domínio Customizado (Opcional)

1. Vá em **Settings → Domains**
2. Adicione seu domínio (se tiver)
3. Ou use o domínio gratuito da Vercel

---

# 3️⃣ Atualizar CORS no Backend

Agora que você tem a URL do frontend deployado:

1. Vá no Render → snacklirio-api → **Environment**
2. Adicione ou edite a variável:
   - `CORS_ORIGIN` = `https://snacklirio.vercel.app` (sua URL real)
3. Salve
4. Aguarde redeploy automático (~2 min)

Ou edite `backend/src/server.ts`:

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:5173',
    'https://snacklirio.vercel.app'
  ],
  credentials: true
}));
```

Commit e push para atualizar.

---

# 4️⃣ Testes Finais em Produção

## Checklist de Validação

### 🔐 Autenticação
- [ ] Abrir `https://snacklirio.vercel.app/register`
- [ ] Criar conta (cliente)
- [ ] Fazer logout
- [ ] Fazer login
- [ ] Verificar se token persiste (recarregar página)

### 🛍️ Produtos (Cliente)
- [ ] Ver lista de produtos em `/products`
- [ ] Adicionar produto ao carrinho
- [ ] Ver carrinho em `/cart`
- [ ] Alterar quantidade
- [ ] Remover item
- [ ] Finalizar pedido
- [ ] Ver pedido em `/profile` ou `/orders`

### 📦 Gestão de Produtos (Fornecedor)
- [ ] Criar nova conta tipo "fornecedor"
- [ ] Login como fornecedor
- [ ] Ver link "Vender" no menu
- [ ] Acessar `/products/manage`
- [ ] Criar produto **COM imagem**
- [ ] Verificar se imagem aparece na lista
- [ ] Editar produto
- [ ] Deletar produto

### 👑 Painel Admin
- [ ] Login como fornecedor
- [ ] Acessar `/admin`
- [ ] Ver métricas (pedidos pendentes/entregues)
- [ ] Ver lista de pedidos
- [ ] Atualizar status de um pedido
- [ ] Ver toast de sucesso
- [ ] Verificar se métricas atualizaram

### 📱 Responsividade
- [ ] Abrir no celular
- [ ] Menu hamburguer funcionando
- [ ] Tabelas viram cards em mobile
- [ ] Formulários legíveis
- [ ] Imagens carregam
- [ ] Sem scroll horizontal

### 🖼️ Upload de Imagens
- [ ] Criar produto com imagem em `/products/manage`
- [ ] Verificar URL da imagem no Network (DevTools)
- [ ] Deve ser algo como: `https://snacklirio-api.onrender.com/uploads/abc123.jpg`
- [ ] Imagem deve carregar em `/products`
- [ ] Imagem deve aparecer no carrinho

---

# 🐛 Troubleshooting

## ❌ Frontend não conecta ao backend

**Sintomas:** Erros de CORS, "Network Error", produtos não carregam

**Soluções:**
1. Verificar `VITE_API_URL` na Vercel (Settings → Environment Variables)
2. Verificar `CORS_ORIGIN` no Render
3. Abrir DevTools → Network → ver se requisições estão indo para URL correta
4. Verificar se backend está online (acessar `https://seu-backend.onrender.com/products`)

## ❌ Imagens não aparecem

**Sintomas:** Produtos aparecem mas sem imagem

**Soluções:**
1. Verificar pasta `backend/uploads/` existe
2. Verificar `server.ts` serve arquivos estáticos:
   ```typescript
   app.use('/uploads', express.static(uploadsDir));
   ```
3. Verificar permissões de escrita no Render (pode precisar usar storage externo)
4. **Alternativa:** Usar Cloudinary para upload de imagens

## ❌ Erro de Database no Render

**Sintomas:** "Prisma Client initialization error"

**Soluções:**
1. Verificar `DATABASE_URL` está correta
2. No Render, ir em **Manual Deploy** → rodar:
   ```
   npx prisma migrate deploy
   ```
3. Verificar logs do deploy (Render → Logs)

## ❌ JWT inválido / sempre deslogando

**Sintomas:** Login funciona mas logo desloga

**Soluções:**
1. Verificar `JWT_SECRET` está configurado no backend
2. Verificar localStorage no navegador (DevTools → Application → Local Storage)
3. Verificar se backend está retornando token no `/auth/login`

## ⏰ Render Free Plan: Cold Starts

⚠️ **Importante:** O plano gratuito do Render "hiberna" após 15 min sem uso.

**Sintomas:** Primeira requisição demora ~30-60 segundos

**Soluções:**
1. Espere alguns segundos na primeira requisição
2. Use um serviço de ping (UptimeRobot) para manter ativo
3. Ou migre para plano pago ($7/mês)

---

# 📊 Monitoramento Pós-Deploy

## Ferramentas Recomendadas

### 1. Vercel Analytics (Grátis)
- Ative em Settings → Analytics
- Veja pageviews, performance, etc.

### 2. Render Logs
- Acesse Render → seu serviço → **Logs**
- Monitore erros em tempo real

### 3. Sentry (Opcional)
- Rastreamento de erros frontend e backend
- Plano gratuito: 5k eventos/mês
- https://sentry.io

---

# 🎉 Deploy Completo!

Quando tudo estiver funcionando:

1. **Atualizar README.md** com links de produção:
   ```markdown
   ## 🌐 Links do Projeto
   
   - 🚀 **App em Produção:** https://snacklirio.vercel.app
   - 🔗 **API Backend:** https://snacklirio-api.onrender.com
   ```

2. **Commitar**:
   ```bash
   git add README.md
   git commit -m "docs: adicionar links de produção"
   git push
   ```

3. **Compartilhar**:
   - Enviar link para professores
   - Adicionar ao portfólio
   - Incluir no currículo
   - Compartilhar no LinkedIn

---

# 🔄 Atualizações Futuras

Sempre que fizer mudanças:

1. **Commit e Push** no GitHub
2. **Vercel** faz redeploy automático do frontend
3. **Render** faz redeploy automático do backend
4. Aguardar ~3-5 min
5. Testar em produção

---

# 📞 Suporte

**Problemas?** Consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Render](https://render.com/docs)
- [Prisma com PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

---

**Última atualização:** Outubro 2025  
**Autor:** Alice Lírio Madalena
