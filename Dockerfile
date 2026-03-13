# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

ARG API_URL=http://localhost:8080/api

COPY package*.json ./
RUN npm ci

COPY . .

# Gera o arquivo de ambiente de produção com a URL da API correta
RUN echo "export const ENVIRONMENT = { production: true, apiUrl: '${API_URL}' };" \
    > src/app/enviroments/enviroment-prod.ts

RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/the-rogue-dev-client/server/server.mjs"]
