# apps/admin/Dockerfile - VERSÃO CORRIGIDA
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json da raiz e do admin
COPY package*.json ./
COPY apps/admin/package*.json ./apps/admin/

# Copiar .env do admin (caminho correto)
COPY apps/admin/.env ./apps/admin/.env

# Copiar configurações compartilhadas
COPY config/ ./config/

# Copiar código do admin
COPY apps/admin/ ./apps/admin/

# Instalar dependências do admin
WORKDIR /app/apps/admin
RUN npm install

# Build da aplicação Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Criar usuário para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar apenas os arquivos essenciais da build
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/.next ./.next
COPY --from=builder /app/apps/admin/package.json ./package.json
COPY --from=builder /app/apps/admin/node_modules ./node_modules
COPY --from=builder /app/apps/admin/.env ./.env

# Mudar proprietário dos arquivos
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]