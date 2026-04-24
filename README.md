# Backend - Blog Social Network

Backend para projeto de rede social/blog desenvolvido com Node.js.

## 📋 Descrição

API RESTful para uma plataforma de rede social que permite aos usuários compartilhar posts, seguir outros usuários, curtir, comentar e gerenciar seus perfis.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL (via Mongoose)
- **JWT** - Autenticação com tokens
- **AWS S3** - Armazenamento de imagens
- **Argon2** - Hash seguro de senhas
- **Multer** - Gerenciamento de uploads de arquivos
- **CORS** - Controle de acesso cross-origin

## 📦 Dependências

```json
{
  "@aws-sdk/client-s3": "^3.966.0",
  "argon2": "^0.44.0",
  "aws-sdk": "^2.1692.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^8.19.1",
  "multer": "^2.0.2",
  "uuid": "^13.0.0"
}
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js instalado
- MongoDB configurado
- Conta AWS para S3 (opcional)

### Instalação

1. Clone o repositório:
```bash
git clone <repositorio>
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (.env):
```
PORT=3000
URLBANCO=mongodb://seu_banco
URLFRONT=http://localhost:seu_port
```

4. Inicie o servidor:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Funcionalidades

### 👤 Autenticação e Usuário
- **Registro** - Criar nova conta com foto de perfil
- **Login** - Autenticação com email e senha
- **Sessão** - Verificar sessão ativa do usuário
- **Editar Perfil** - Atualizar foto de perfil
- **Editar Informações** - Atualizar dados do perfil (nome, bio, etc)
- **Editar Senha** - Alterar senha da conta
- **Atualizar Dados** - Atualizar informações gerais da conta

### 📝 Posts e Conteúdo
- **Postar** - Criar novo post com imagem
- **Feed** - Listar posts do timeline principal
- **Feed do Usuário** - Listar posts específicos de um usuário
- **Deletar Foto** - Remover foto de um post

### ❤️ Interações
- **Curtir** - Curtir/descurtir posts
- **Comentar** - Adicionar comentários em posts
- **Seguir** - Seguir outros usuários
- **Deixar de Seguir** - Deseguir usuários

### 👥 Perfil
- **Perfil** - Ver perfil do usuário logado
- **Perfil de Outros** - Visualizar perfil de outros usuários
- **Buscar Usuário** - Buscar usuários na plataforma

### 🏠 Geral
- **Home** - Endpoint inicial (status do servidor)

## 🔌 Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
|--------|----------|--------------|-----------|
| GET | `/` | ❌ | Status do servidor |
| POST | `/register` | ❌ | Registrar novo usuário |
| POST | `/login` | ❌ | Fazer login |
| GET | `/session` | ✅ | Verificar sessão |
| GET | `/feed` | ✅ | Obter feed de posts |
| GET | `/feedUser/:id` | ✅ | Posts de um usuário específico |
| GET | `/perfil` | ✅ | Perfil do usuário logado |
| GET | `/perfiloutro/:id` | ✅ | Perfil de outro usuário |
| GET | `/buscar` | ✅ | Buscar usuários |
| PUT | `/postar` | ✅ | Criar novo post |
| PUT | `/curtida` | ✅ | Curtir/descurtir post |
| PUT | `/comentario` | ✅ | Comentar em post |
| PUT | `/editperfil` | ✅ | Atualizar foto do perfil |
| PUT | `/editinfo` | ✅ | Editar informações do perfil |
| PUT | `/editsenha` | ✅ | Alterar senha |
| PUT | `/attdados` | ✅ | Atualizar dados gerais |
| PUT | `/Seguir` | ✅ | Seguir usuário |
| PUT | `/deixarDeSeguir` | ✅ | Deseguir usuário |
| DELETE | `/Delete` | ✅ | Deletar foto/post |

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. O token deve ser enviado no header:

```
Authorization: Bearer seu_token_aqui
```

## 📁 Estrutura do Projeto

```
.
├── controllers/          # Lógica das operações
├── middlewares/          # Middleware de autenticação e upload
├── models/               # Schemas do MongoDB
├── routes.js            # Definição das rotas
├── server.js            # Configuração do servidor
├── package.json         # Dependências
└── README.md            # Este arquivo
```

## 🔒 Middlewares

- **authMiddleware.js** - Verifica e valida JWT
- **BDimagens.js** - Gerencia uploads de imagens

## 💾 Modelos

- **UserModel.js** - Schema de usuário no MongoDB

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor com nodemon (desenvolvimento)

## ⚙️ Variáveis de Ambiente

```env
PORT=3000
URLBANCO=mongodb://uri_seu_banco
URLFRONT=http://localhost:porta_frontend
AWS_ACCESS_KEY_ID=sua_chave_aws
AWS_SECRET_ACCESS_KEY=sua_chave_secreta_aws
AWS_REGION=regiao_aws
BUCKET_NAME=nome_seu_bucket_s3
JWT_SECRET=sua_chave_secreta_jwt
```

## 👨‍💻 Desenvolvimento

Para desenvolvimento local:

```bash
npm install
npm run dev
```

O nodemon irá reiniciar o servidor automaticamente ao detectar mudanças nos arquivos.

## 📄 Licença

Veja o arquivo LICENSE para mais informações.

---

**Nota**: Este é o backend da aplicação. Certifique-se de que o frontend está configurado com a URL correta (URLFRONT) no arquivo .env.
