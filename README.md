# 🍔 Snack Lirio

Sua comida interna, de forma rápida e prática!
Um sistema inspirado no iFood, feito para facilitar os pedidos dentro do internato, conectando alunos, mercearias e restaurantes locais.

## 📌 Visão Geral

O Snack Lirio é um projeto de TCC desenvolvido no curso técnico em Informática.
O sistema foi planejado para permitir que alunos façam pedidos online de forma simples, prática e eficiente, utilizando tecnologias modernas no frontend e backend.

## 🛠️ Tecnologias Utilizadas

### Frontend

- ⚛️ React + Vite
- 🎨 Tailwind CSS (estilização responsiva)
- 🔗 React Router DOM (navegação)
- 🌐 Axios (requisições para API)
- 🟦 TypeScript (tipagem segura)

### Backend

- 🟢 Node.js
- 🚀 Express (rotas e API)
- 🗄️ Prisma (ORM para banco de dados)
- 🐬 MySQL (banco de dados – planejado para o 3º bimestre)

### Outros

- 🐙 Git + GitHub (versionamento e hospedagem do código)
- ⚡ Scripts automáticos para setup (Windows/Linux)

## 📂 Estrutura do Projeto

```
snack-lirio/
│── backend/        # API com Node.js + Prisma
│── src/            # Código fonte do frontend
│   ├── components/ # Componentes reutilizáveis
│   ├── contexts/   # Contextos globais (ex.: autenticação)
│   ├── pages/      # Páginas principais (Home, Login, Cadastro, etc.)
│   └── routes/     # Configuração das rotas
│── prisma/         # Modelagem do banco de dados
│── package.json    # Dependências e scripts
│── README.md       # Documentação principal
```

## 🚧 O que já foi feito

✅ Criação do repositório GitHub e configuração inicial
✅ Frontend estruturado com React, Vite, Tailwind e TypeScript
✅ Backend iniciado com Node.js + Prisma
✅ Criação de componentes principais (Header, Footer, Layout)
✅ Páginas principais: Home, Login, Cadastro
✅ Rotas implementadas com React Router
✅ Contexto de autenticação (AuthContext)

## 🎯 Próximos Passos

🔲 Criar páginas adicionais (Carrinho, Sobre, Perfil)
🔲 Conectar frontend ao backend com Axios
🔲 Finalizar banco de dados com Prisma + MySQL
🔲 Implementar fluxo completo (Cadastro → Login → Pedido → Carrinho → Checkout)
🔲 Refinar design com base no protótipo do Figma/Plasmic

## 🚀 Como Rodar o Projeto

Clone o repositório:
```bash
git clone https://github.com/alicelirio/snacklirio.git
cd snacklirio
```

### 🔹 Frontend
```bash
cd src
npm install
npm run dev
```

### 🔹 Backend
```bash
cd backend
npm install
npm run dev
```

Acesse no navegador:
👉 http://localhost:5173 (frontend)
👉 http://localhost:3000 (backend)

## 👩‍💻 Autora

Alice Lírio Madalena
💻 Projeto desenvolvido como parte do TCC do curso Técnico em Informática (3º ano do ensino médio)
