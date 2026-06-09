# Class 21 workspace - start

Starting point for class 21.

This workspace is the final state of class 20:
- Dockerized backend with SQLite persistence.
- Angular frontend connected to the backend.
- Docker Compose stack with backend, frontend and n8n.
- Backend `AiService` with local mock and n8n mock provider.
- Importable n8n mock workflow.

## Run local backend

```bash
cd backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Swagger: `http://localhost:5001/api`

## Run local frontend

```bash
cd frontend/chat-app
npm install
npm run start
```

Frontend: `http://localhost:5300`

## Run Docker stack

```bash
cd chat-docker
docker compose up -d
```

Frontend: `http://localhost:4300`

Swagger: `http://localhost:4012/api`

n8n: `http://localhost:5690`
