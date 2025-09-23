# Etapa 1 – Build da aplicação
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências com cache otimizado
RUN npm ci

# Copia todo o restante do projeto
COPY . .

# Compila o projeto
RUN npm run build

# Etapa 2 – Imagem de produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia somente o necessário
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Se estiver usando variáveis públicas em runtime, você pode copiar o `.env.production`:
# COPY --from=builder /app/.env.production .env.production

EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
