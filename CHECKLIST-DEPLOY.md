# ✅ Checklist Rápido de Deploy

## 📋 Antes de Começar

- [ ] Backend funcionando em http://localhost:3000
- [ ] Frontend funcionando em http://localhost:5173
- [ ] Todas funcionalidades testadas localmente
- [ ] Código commitado e pushed no GitHub

---

## 🎯 Sequência de Deploy

### 1️⃣ Backend no Render (30-40 min)

1. **Criar conta Render**
   - [ ] Acessar https://render.com
   - [ ] Sign up com GitHub
   - [ ] Autorizar acesso ao repo

2. **Criar PostgreSQL Database**
   - [ ] New + → PostgreSQL
   - [ ] Nome: `snacklirio-db`
   - [ ] Plan: Free
   - [ ] Create Database
   - [ ] Copiar "Internal Database URL"

3. **Criar Web Service**
   - [ ] New + → Web Service
   - [ ] Conectar repo `snacklirio`
   - [ ] Root Directory: `snack-lirio/backend`
   - [ ] Build: `npm install && npm run build && npx prisma migrate deploy`
   - [ ] Start: `npm start`
   - [ ] Plan: Free

4. **Configurar Environment Variables**
   - [ ] `DATABASE_URL` = [colar URL do banco]
   - [ ] `JWT_SECRET` = [gerar em randomkeygen.com]
   - [ ] `PORT` = `3000`
   - [ ] `NODE_ENV` = `production`
   - [ ] `CORS_ORIGIN` = `https://snacklirio.vercel.app` (atualizar depois)

5. **Deploy e Testar**
   - [ ] Create Web Service
   - [ ] Aguardar build (~10 min)
   - [ ] Copiar URL: `https://snacklirio-api.onrender.com`
   - [ ] Testar: abrir `https://SEU-BACKEND/products` no navegador

---

### 2️⃣ Frontend na Vercel (15-20 min)

1. **Criar conta Vercel**
   - [ ] Acessar https://vercel.com
   - [ ] Sign up com GitHub
   - [ ] Autorizar acesso aos repos

2. **Importar projeto**
   - [ ] Add New → Project
   - [ ] Selecionar `snacklirio`
   - [ ] Import

3. **Configurar build**
   - [ ] Framework: Vite
   - [ ] Root Directory: `snack-lirio`
   - [ ] Build Command: `npm run build`
   - [ ] Output: `dist`

4. **Environment Variables**
   - [ ] `VITE_API_URL` = `https://snacklirio-api.onrender.com` (sua URL do backend)

5. **Deploy e Testar**
   - [ ] Deploy
   - [ ] Aguardar build (~5 min)
   - [ ] Copiar URL: `https://snacklirio.vercel.app`
   - [ ] Abrir no navegador

---

### 3️⃣ Atualizar CORS (5 min)

1. **Voltar ao Render**
   - [ ] Ir em snacklirio-api → Environment
   - [ ] Editar `CORS_ORIGIN`
   - [ ] Valor: `https://snacklirio.vercel.app` (sua URL do frontend)
   - [ ] Save Changes
   - [ ] Aguardar redeploy (~3 min)

---

### 4️⃣ Testes em Produção (20 min)

- [ ] **Registro:** Criar conta cliente
- [ ] **Login:** Fazer login
- [ ] **Produtos:** Ver lista de produtos
- [ ] **Carrinho:** Adicionar ao carrinho
- [ ] **Pedido:** Finalizar pedido
- [ ] **Fornecedor:** Criar conta fornecedor
- [ ] **Upload:** Criar produto com imagem
- [ ] **Imagem:** Verificar se imagem aparece
- [ ] **Admin:** Acessar painel admin
- [ ] **Status:** Atualizar status de pedido
- [ ] **Mobile:** Abrir no celular
- [ ] **Menu:** Testar menu hamburguer

---

## 🐛 Se algo der errado

Consulte: [DEPLOY.md](./DEPLOY.md) - Seção **Troubleshooting**

Problemas comuns:
- **CORS Error:** Verificar CORS_ORIGIN no Render
- **Imagens não aparecem:** Ver logs do Render
- **Database error:** Rodar `npx prisma migrate deploy` manualmente
- **API não responde:** Aguardar cold start (~30s na primeira requisição)

---

## ✅ Deploy Completo!

Quando tudo funcionar:

- [ ] Atualizar README.md com URLs reais
- [ ] Commit e push
- [ ] Compartilhar com professores
- [ ] Adicionar ao portfólio

---

**Tempo estimado total:** 1h30min  
**Custo:** R$ 0,00 (100% gratuito)

---

📞 **Dúvidas?** Consulte [DEPLOY.md](./DEPLOY.md) (guia completo e detalhado)
