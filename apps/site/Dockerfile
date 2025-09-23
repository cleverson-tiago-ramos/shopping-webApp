# apps/site/Dockerfile - VERSÃO CORRIGIDA
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json da raiz e do site
COPY package*.json ./
COPY apps/site/package*.json ./apps/site/

# Copiar .env do site
COPY apps/site/.env ./apps/site/.env

# Copiar configurações compartilhadas
COPY config/ ./config/

# Copiar código do site
COPY apps/site/ ./apps/site/

# Instalar dependências do site
WORKDIR /app/apps/site
RUN npm install

# Build da aplicação Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos da build
COPY --from=builder /app/apps/site/public ./public
COPY --from=builder /app/apps/site/.next ./.next
COPY --from=builder /app/apps/site/package.json ./package.json
COPY --from=builder /app/apps/site/node_modules ./node_modules
COPY --from=builder /app/apps/site/.env ./.env

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]