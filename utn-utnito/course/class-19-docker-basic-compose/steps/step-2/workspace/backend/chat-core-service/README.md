# Class 19 backend start

Backend snapshot for class 19 step 2.

It starts from the class 17 end backend and includes Docker support.

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
docker build -t class19-chat-core-service ./backend/chat-core-service
docker volume create class19-chat-db-data
docker run --rm \
  --name class19-chat-core-service \
  --env-file ./backend/chat-core-service/.env.docker \
  -p 4012:3001 \
  -v class19-chat-db-data:/app/database \
  class19-chat-core-service
```

Swagger: `http://localhost:4012/api`

Health: `http://localhost:4012/health`
