# 🍔 Snack Lírio

Sua comida interna, de forma rápida e prática!
Um sistema completo de delivery inspirado no iFood, desenvolvido para facilitar pedidos dentro do internato, conectando alunos, fornecedores e administradores.

## 📌 Visão Geral

O Snack Lírio é um projeto de TCC desenvolvido no curso técnico em Informática (3º ano).
Sistema completo de e-commerce com autenticação, gestão de produtos, carrinho de compras, pedidos e painel administrativo.

## 🛠️ Tecnologias Utilizadas

### Frontend

- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS (design responsivo mobile-first)
- 🔗 React Router DOM v6 (navegação SPA)
- 🌐 Axios (cliente HTTP)
- 🟦 TypeScript (tipagem forte)
- 🔥 React Hot Toast (notificações)
- 🔐 Context API (gerenciamento de estado global)

### Backend

- 🟢 Node.js + Express
- 🗄️ Prisma ORM (SQLite em dev, PostgreSQL em prod)
- 🔒 JWT (autenticação stateless)
- � bcryptjs (hash de senhas)
- 📁 Multer (upload de imagens)
- 🌐 CORS (segurança cross-origin)

### DevOps & Ferramentas

- 🐙 Git + GitHub (versionamento)
- 🚀 Vercel (deploy frontend)
- 🛠️ Render/Railway (deploy backend)
- 📝 TypeScript (todo o projeto)
- ⚡ Scripts automáticos de setup

## 📂 Estrutura do Projeto

```
tcc-3C-alice/
├── snack-lirio/              # Frontend React + Vite
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── Header.tsx    # Menu responsivo com mobile
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── PrivateRoute.tsx  # Proteção de rotas por role
│   │   ├── contexts/         # Gerenciamento de estado
│   │   │   ├── AuthContext.tsx   # Autenticação JWT
│   │   │   └── CartContext.tsx   # Carrinho de compras
│   │   ├── pages/            # Páginas principais
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Admin.tsx         # Dashboard admin/fornecedor
│   │   │   └── ProductManagement.tsx  # CRUD produtos
│   │   ├── routes/           # Configuração de rotas
│   │   ├── services/         # API client (Axios)
│   │   └── index.css         # Estilos globais Tailwind
│   ├── backend/              # API Node.js + Express
│   │   ├── src/
│   │   │   ├── server.ts     # Servidor principal
│   │   │   ├── middlewares/  # Auth middleware (JWT)
│   │   │   ├── routes/
│   │   │   │   ├── products.ts   # CRUD produtos + upload
│   │   │   │   └── orders.ts     # Gestão de pedidos
│   │   │   └── utils/
│   │   │       └── upload.ts     # Configuração Multer
│   │   ├── prisma/
│   │   │   └── schema.prisma     # Modelagem do banco
│   │   └── uploads/          # Imagens de produtos
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── .env.example          # Template variáveis ambiente
├── README.md
└── VERIFICACAO.md            # Checklist técnico completo
```

## ✅ Funcionalidades Implementadas

### 🔐 Autenticação e Autorização
- ✅ Registro de usuários (cliente/fornecedor)
- ✅ Login com JWT (token em localStorage)
- ✅ Middleware de autenticação no backend
- ✅ Proteção de rotas por role (admin, fornecedor, cliente)
- ✅ Context API para gerenciamento de sessão

### 🛍️ Gestão de Produtos
- ✅ Listagem pública de produtos
- ✅ CRUD completo (fornecedores)
- ✅ Upload de imagens (Multer)
- ✅ Filtro por fornecedor
- ✅ Design responsivo (cards adaptativos)

### 🛒 Carrinho e Pedidos
- ✅ Adicionar/remover produtos
- ✅ Controle de quantidade
- ✅ Cálculo automático de total
- ✅ Checkout com confirmação
- ✅ Histórico de pedidos do usuário
- ✅ Detalhes de pedido com itens

### 📊 Painel Administrativo
- ✅ Dashboard com métricas (pedidos pendentes/entregues)
- ✅ Listagem de todos os pedidos (admin/fornecedor)
- ✅ Atualização de status de pedido
- ✅ Gestão de produtos (admin vê todos, fornecedor vê os seus)
- ✅ Sistema de badges coloridos por status
- ✅ Toasts de feedback (sucesso/erro)

### 📱 UX e Responsividade
- ✅ Menu mobile com hamburguer
- ✅ Tabelas viram cards em telas pequenas
- ✅ Formulários adaptados para mobile
- ✅ Grid responsivo (1/2/3 colunas)
- ✅ Imagens otimizadas
- ✅ Prevenção de overflow horizontal
- ✅ Testado em 360x640px

## 🎯 Roadmap (Próximas Fases)

### � Deploy e Produção
- [ ] Deploy frontend (Vercel)
- [ ] Deploy backend (Render/Railway)
- [ ] Migração SQLite → PostgreSQL
- [ ] Configurar variáveis de ambiente produção
- [ ] CI/CD automático via GitHub

### 🎨 Melhorias UX
- [ ] Página 404 personalizada
- [ ] Loading skeletons
- [ ] Animações de transição
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

### � Funcionalidades Avançadas
- [ ] Sistema de avaliações
- [ ] Notificações em tempo real
- [ ] Rastreamento de pedidos
- [ ] Múltiplos endereços de entrega
- [ ] Cupons de desconto
- [ ] Relatórios e analytics

### 🔧 Infraestrutura
- [ ] Upload de imagens na nuvem (Cloudinary/S3)
- [ ] Cache com Redis
- [ ] Testes automatizados (Jest/Vitest)
- [ ] Logs estruturados
- [ ] Monitoramento (Sentry)

## 🚀 Como Rodar o Projeto

### 📋 Pré-requisitos
- Node.js 18+ instalado
- Git instalado
- Terminal (PowerShell, Bash, etc.)

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/alicelirio/snacklirio.git
cd tcc-3C-alice
```

### 2️⃣ Configurar Backend

```bash
cd snack-lirio/backend

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma generate
npx prisma migrate dev

# Criar arquivo .env (opcional, usa defaults se não existir)
# Adicione: JWT_SECRET=sua-chave-secreta-aqui

# Iniciar servidor
npm run dev
```

✅ Backend rodando em: **http://localhost:3000**

### 3️⃣ Configurar Frontend

```bash
cd ../  # Voltar para snack-lirio/

# Instalar dependências
npm install

# Criar arquivo .env (opcional)
# VITE_API_URL=http://localhost:3000

# Iniciar aplicação
npm run dev
```

✅ Frontend rodando em: **http://localhost:5173**

### � Acessar via celular (mesma rede Wi-Fi)

1. Descubra seu IP local:
```bash
ipconfig  # Windows
ifconfig  # Linux/Mac
```

2. Ajuste CORS no backend (`backend/src/server.ts`):
```typescript
app.use(cors({
  origin: ['http://localhost:5173', 'http://SEU_IP:5173'],
  credentials: true
}));
```

3. Acesse no celular:
```
http://SEU_IP:5173
```

---

## 🔐 Variáveis de Ambiente

### Frontend (.env na raiz de `snack-lirio/`)
```env
VITE_API_URL=http://localhost:3000
```

### Backend (.env em `snack-lirio/backend/`)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="chave-super-secreta-mude-em-producao"
PORT=3000
CORS_ORIGIN="http://localhost:5173"
```

### Produção (exemplo)
**Frontend (Vercel):**
```env
VITE_API_URL=https://snacklirio-api.railway.app
```

**Backend (Railway/Render):**
```env
DATABASE_URL="postgresql://user:pass@host:5432/snacklirio"
JWT_SECRET="chave-forte-aleatoria-64-caracteres"
PORT=3000
CORS_ORIGIN="https://snacklirio.vercel.app"
```

---

## 🏗️ Build para Produção

### Frontend
```bash
cd snack-lirio
npm run build  # Gera pasta dist/
npm run preview  # Testar build localmente
```

### Backend
```bash
cd snack-lirio/backend
npm run build  # Compila TypeScript para JavaScript
npx prisma migrate deploy  # Executar migrations em produção
```

---

## 🧪 Testar Funcionalidades

### Fluxo Cliente
1. Registrar em `/register` (tipo: cliente)
2. Login em `/login`
3. Ver produtos em `/products`
4. Adicionar ao carrinho
5. Finalizar pedido em `/cart`
6. Ver pedidos em `/profile` ou `/orders`

### Fluxo Fornecedor
1. Registrar em `/register` (tipo: fornecedor)
2. Login
3. Acessar `/products/manage`
4. Criar produto com imagem
5. Acessar `/admin` para gerenciar pedidos
6. Atualizar status de pedidos

### Fluxo Admin
1. Criar usuário admin direto no banco (Prisma Studio)
2. Login
3. Acessar `/admin`
4. Ver todos produtos e pedidos
5. Atualizar status de qualquer pedido

---

## 📚 Documentação Técnica

Para checklist completo de verificação e deploy, consulte: **[VERIFICACAO.md](./VERIFICACAO.md)**

### Endpoints da API

**Autenticação:**
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login

**Produtos:**
- `GET /products` - Listar todos
- `GET /products/supplier` - Produtos do fornecedor (autenticado)
- `POST /products` - Criar produto (fornecedor, multipart/form-data)
- `PUT /products/:id` - Atualizar produto (fornecedor)
- `DELETE /products/:id` - Deletar produto (fornecedor)

**Pedidos:**
- `POST /orders` - Criar pedido (autenticado)
- `GET /orders` - Listar pedidos (admin/fornecedor)
- `GET /orders/:userId` - Pedidos do usuário
- `GET /orders/:orderId/details` - Detalhes do pedido
- `PATCH /orders/:orderId/status` - Atualizar status (admin/fornecedor)
- `GET /orders/stats/summary` - Métricas dashboard (admin/fornecedor)

---

## 🤝 Contribuindo

Este é um projeto acadêmico (TCC), mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Commit: `git commit -m 'feat: Nova funcionalidade'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

## 👩‍💻 Autora

**Alice Lírio Madalena**  
💻 Projeto desenvolvido como TCC do curso Técnico em Informática (3º ano)  
📧 Contato: [GitHub](https://github.com/alicelirio)

---

## 🙏 Agradecimentos

- Escola e professores orientadores
- Comunidade open-source (React, Node.js, Tailwind)
- Inspiração: iFood, Uber Eats

---

## 📊 Status do Projeto

🟢 **Em desenvolvimento ativo**  
✅ Funcionalidades core implementadas  
🚀 Preparado para deploy  
📱 Responsivo para mobile  

**Última atualização:** Outubro 2025
