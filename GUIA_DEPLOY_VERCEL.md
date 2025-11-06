# 🚀 GUIA COMPLETO - DEPLOY NO VERCEL

## 📋 PRÉ-REQUISITOS

Antes de começar, você precisa ter:
- ✅ Conta no GitHub (você já tem: alicelirio)
- ✅ Repositório no GitHub (você já tem: snacklirio)
- ✅ Código commitado (já está!)

---

## 🎯 PASSO A PASSO DETALHADO

### 1️⃣ CRIAR CONTA NO VERCEL (2 minutos)

1. Acesse: **https://vercel.com**
2. Clique em **"Sign Up"** (Cadastrar)
3. Escolha: **"Continue with GitHub"**
4. Faça login com sua conta GitHub (alicelirio)
5. Autorize o Vercel a acessar seus repositórios
   - ✅ Permitir acesso ao repositório `snacklirio`

---

### 2️⃣ IMPORTAR O PROJETO (3 minutos)

1. No painel do Vercel, clique em: **"Add New Project"**
2. Procure pelo repositório: **`alicelirio/snacklirio`**
3. Clique em **"Import"**

---

### 3️⃣ CONFIGURAR O PROJETO (5 minutos)

Na tela de configuração, preencha:

#### **Framework Preset:**
- Selecione: **Vite**

#### **Root Directory:**
- Clique em **"Edit"**
- Digite: `snack-lirio/frontend`
- ✅ Muito importante! O Vercel precisa saber onde está o frontend

#### **Build and Output Settings:**
- Build Command: `npm run build` (já vem preenchido)
- Output Directory: `dist` (já vem preenchido)
- Install Command: `npm install` (já vem preenchido)

#### **Environment Variables (Variáveis de Ambiente):**
Clique em **"Add Environment Variable"**

**Por enquanto, use localhost (depois trocaremos):**
```
Nome: VITE_API_URL
Valor: http://localhost:3000
```

⚠️ **IMPORTANTE:** Depois que fizermos o deploy do backend, você vai voltar aqui e trocar para a URL do Railway.

---

### 4️⃣ FAZER O DEPLOY (1 minuto)

1. Clique no botão azul: **"Deploy"**
2. Aguarde 2-3 minutos (o Vercel vai fazer o build)
3. 🎉 Quando aparecer confetes, está pronto!

---

### 5️⃣ TESTAR O SITE (1 minuto)

1. Clique em **"Visit"** ou copie a URL que apareceu
2. Sua URL será algo como: `https://snacklirio.vercel.app`
3. Abra no navegador

**⚠️ PROBLEMA ESPERADO:**
O site vai abrir, mas o login não vai funcionar porque:
- A API ainda está rodando só no seu computador (localhost:3000)
- Precisamos fazer deploy do backend também

---

## 🔄 PRÓXIMO PASSO: DEPLOY DO BACKEND

Agora precisamos colocar o backend online também. Vou criar um guia separado para isso!

### Opções para Backend:
1. **Railway** (Recomendado - mais fácil) ⭐
2. **Render** (Grátis, mas mais lento)
3. **AlwaysData** (Você já tem MySQL lá, podemos colocar a API também)

---

## 🛠️ CONFIGURAÇÕES ADICIONAIS (APÓS DEPLOY DO BACKEND)

### Atualizar URL da API:

1. No Vercel, vá em: **Settings** → **Environment Variables**
2. Edite `VITE_API_URL`
3. Troque para: `https://seu-backend.railway.app` (ou a URL que o Railway gerar)
4. Clique em **"Save"**
5. Vá em **"Deployments"** → Clique nos 3 pontinhos do último deploy → **"Redeploy"**

---

## 📱 DOMÍNIO PERSONALIZADO (OPCIONAL)

Se quiser um domínio tipo `snacklirio.com.br`:

1. No Vercel, vá em: **Settings** → **Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções

**Domínio grátis:**
Você já ganha automaticamente: `https://snacklirio.vercel.app`

---

## ✅ CHECKLIST DO DEPLOY

- [ ] Conta Vercel criada
- [ ] Repositório importado
- [ ] Root Directory configurado (`snack-lirio/frontend`)
- [ ] Build realizado com sucesso
- [ ] Site abrindo no navegador
- [ ] URL copiada e salva
- [ ] (Aguardando) Deploy do backend
- [ ] (Depois) VITE_API_URL atualizada
- [ ] (Depois) Redeploy feito
- [ ] (Depois) Login funcionando online

---

## 🐛 PROBLEMAS COMUNS

### "Build failed"
**Solução:** Verificar se o Root Directory está correto: `snack-lirio/frontend`

### "Module not found"
**Solução:** O Vercel vai instalar automaticamente. Se persistir, verificar package.json.

### "Page not found"
**Solução:** Arquivo `vercel.json` já foi criado para resolver isso! ✅

### "API não conecta"
**Solução:** Normal! Precisa fazer deploy do backend primeiro.

---

## 📞 SUPORTE

Se tiver qualquer erro, me mande:
1. Print da tela de erro
2. Mensagem de erro completa
3. Em que passo você está

---

## 🎯 RESUMO RÁPIDO

```bash
1. Ir em vercel.com
2. Sign up with GitHub
3. Import snacklirio
4. Root Directory: snack-lirio/frontend
5. Deploy!
6. Copiar URL gerada
7. (Depois) Deploy backend no Railway
8. (Depois) Atualizar VITE_API_URL
```

**Tempo total:** ~10 minutos

Boa sorte! 🚀
