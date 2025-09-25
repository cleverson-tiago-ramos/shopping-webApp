# 🛍️ Shopping WebApp (Monorepo)

Este projeto é uma aplicação completa baseada em arquitetura de **monorepo**, com três aplicações distintas:

- 🛒 **Site** (Next.js)
- 🛠️ **Admin** (Next.js)
- ⚙️ **API** (NestJS )
- 🐘 **PostgreSQL** (Banco de dados)
- 🔧 _Opcional_: Redis, BullMQ, Firebase (já estruturado para integração futura)

---

## 🚀 Como subir o projeto com Docker Compose

> É necessário ter **Docker** e **Docker Compose** instalados.

### Passos:

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/shopping-webApp.git
cd shopping-webApp

# Subir os containers com build
docker compose up --build
```

---

## ⚙️ Explicação do `docker-compose.yml`

```yaml
services:
  site: # Frontend público (loja virtual)
  admin: # Painel administrativo
  api: # Backend (REST API)
  postgres: # Banco de dados PostgreSQL
```

### 🧩 Detalhes dos serviços

| Serviço    | Porta Externa | Framework  | Contexto | Dockerfile              |
| ---------- | ------------- | ---------- | -------- | ----------------------- |
| `site`     | `3000`        | Next.js    | `.`      | `apps/site/Dockerfile`  |
| `admin`    | `3001`        | Next.js    | `.`      | `apps/admin/Dockerfile` |
| `api`      | `3002`        | Node.js    | `.`      | `apps/api/Dockerfile`   |
| `postgres` | `5432`        | PostgreSQL | -        | Imagem oficial (`16`)   |

> 🔁 Os serviços compartilham a mesma `network` chamada `shopping-network`.

---

## 📁 Estrutura de Pastas

```
shopping-webApp/
│
├── apps/
│   ├── site/          # Aplicação pública (Next.js)
│   ├── admin/         # Painel administrativo (Next.js)
│   └── api/           # API backend (NestJS ou Express)
│
├── config/            # Configurações compartilhadas (ex: next.config.ts)
│
├── docker-compose.yml
├── README.md
└── .env               # Variáveis de ambiente (não versionado)
```

---

## 📄 Arquivos `.env` esperados

### apps/site/.env e apps/admin/.env

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### apps/api/.env

```env
PORT=8000
NODE_ENV=development
JWT_SECRET=supersecretjwt
JWT_EXPIRES_IN=1h

DATABASE_URL=postgresql://user:password@postgres:5432/shopping

REDIS_HOST=redis
REDIS_PORT=6379
```

> ⚠️ Altere as variáveis conforme necessário. O Redis e o Firebase são opcionais, mas a estrutura já suporta.

---

## 🔗 Acessos locais

| Aplicação | URL                   |
| --------- | --------------------- |
| 🛒 Site   | http://localhost:3000 |
| 🛠️ Admin  | http://localhost:3001 |
| ⚙️ API    | http://localhost:3002 |
| 🐘 Banco  | localhost:5432        |

---

## 🧼 Comandos úteis

```bash
# Subir com build forçado
docker compose up --build

# Parar e remover os containers, volumes e rede
docker compose down -v
```
