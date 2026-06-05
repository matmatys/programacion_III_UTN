# Class 20 backend start

Backend start snapshot for class 20.

It starts from the class 19 end backend and includes Docker support.

## Run locally

```bash
cp .env.example .env
npm install
npm run start:dev
```

Swagger: `http://localhost:5001/api`

Health: `http://localhost:5001/health`

## Docker

This snapshot includes backend Docker support.

```bash
docker build -t class20-chat-core-service ./backend/chat-core-service
docker volume create class20-chat-db-data
docker run --rm \
  --name class20-chat-core-service \
  --env-file ./backend/chat-core-service/.env.docker \
  -p 4012:3001 \
  -v class20-chat-db-data:/app/database \
  class20-chat-core-service
```

Swagger: `http://localhost:4012/api`

Health: `http://localhost:4012/health`
