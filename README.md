# 📌 Relatório Parcial do Projeto – Snack Lirio

## Estrutura do Projeto

O projeto Snack Lirio foi desenvolvido com uma arquitetura dividida em frontend e backend, de forma a garantir organização, escalabilidade e facilidade de manutenção.

### Raiz do Projeto

- `.gitignore`: Configurado para ignorar arquivos e pastas desnecessárias no repositório.
- Scripts (`.sh` e `.bat`): Criados para facilitar a instalação e execução do sistema, permitindo inicialização rápida.

### Frontend (snack-lirio/src)

O frontend foi construído utilizando React, com o auxílio do Vite para otimizar o ambiente de desenvolvimento, Tailwind CSS para estilização responsiva e TypeScript para maior segurança no código.

#### Estrutura principal:

- `App.tsx`: Arquivo principal da aplicação.
- `index.css`: Estilos globais do sistema.
- `components/`: Componentes reutilizáveis (ex.: Header, Footer, Layout).
- `pages/`: Páginas principais (Home, Login, Register).
- `routes/`: Arquivos responsáveis pelo gerenciamento das rotas (AppRoutes.tsx, index.tsx).
- `contexts/`: Contexto de autenticação (AuthContext.tsx), responsável pelo gerenciamento de sessão do usuário.

### Backend (snack-lirio/backend/src)

O backend foi desenvolvido em Node.js, utilizando o Prisma ORM para modelagem e manipulação do banco de dados.

#### Estrutura principal:

- `prisma/schema.prisma`: Define a modelagem do banco de dados.
- Rotas e Middlewares: Responsáveis pelo controle das funcionalidades e regras de negócio.
- `package.json`: Gerencia as dependências e scripts do backend.

## O que já foi implementado

- ✅ Criação do repositório GitHub e versionamento do projeto.
- ✅ Configuração inicial com React, Vite, Tailwind CSS e TypeScript.
- ✅ Estruturação do backend utilizando Prisma para o banco de dados.
- ✅ Implementação inicial de páginas no frontend e configuração de rotas.
- ✅ Criação de contexto de autenticação para login e gerenciamento de sessão.
- ✅ Desenvolvimento de componentes básicos (Layout, Header, Footer).
- ✅ Configuração de scripts automáticos para facilitar a instalação e execução.

## Próximos Passos

### Implementações Pendentes

1. Implementar páginas adicionais:
   - Carrinho
   - Sobre
   - Perfil

2. Conectar frontend e backend utilizando Axios.

3. Finalizar modelagem e implementação do banco de dados no Prisma:
   - Usuários
   - Pedidos
   - Produtos

### Testes do Sistema

Testar fluxo completo do sistema:
- Cadastro/Login
- Seleção de produtos
- Adição ao carrinho
- Finalização do pedido

### Design

- Refinar o design utilizando os protótipos do Figma integrados ao Plasmic.
