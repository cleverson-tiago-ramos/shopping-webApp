# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Instala apenas as dependências necessárias para build
COPY package*.json ./
COPY .env .env

RUN npm install

# Copia os demais arquivos
COPY . .

# Build da aplicação Next.js
RUN npm run build


# Etapa 2: Produção (imagem mais leve)
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copia apenas os arquivos essenciais da build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

EXPOSE 3000

# Roda a aplicação como servidor Next.js
CMD ["npm", "start"]
