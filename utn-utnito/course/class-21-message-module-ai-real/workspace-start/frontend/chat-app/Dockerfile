FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

COPY . .
RUN CORE_SERVICE_URL="$(grep '^CORE_SERVICE_URL=' .env.docker | cut -d '=' -f2- || true)" \
  && CORE_SERVICE_URL="${CORE_SERVICE_URL:-http://localhost:4012}" \
  && sed -i "s|__CORE_SERVICE_URL__|${CORE_SERVICE_URL}|g" src/environments/environment.docker.ts \
  && npm run build -- --configuration docker

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/chat-app/browser /usr/share/nginx/html
