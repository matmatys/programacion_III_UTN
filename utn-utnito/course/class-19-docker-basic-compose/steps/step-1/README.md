# Step 1 - Backend Docker + SQLite persistente

## Espanol

### Objetivo
Dockerizar `chat-core-service` y ejecutar el backend en un contenedor usando variables de entorno y un volumen para persistir SQLite.

### Pre-requisito
Tener Docker Desktop instalado y corriendo.

### Archivos a copiar
Copiar sobre: `course/class-19-docker-basic-compose/workspace-start`

- `workspace` completo de este step.

Comando recomendado:
```bash
cd course/class-19-docker-basic-compose
rsync -a --delete steps/step-1/workspace/ workspace-start/
```

### Cambios clave
- `backend/chat-core-service/Dockerfile`: build multi-stage con `node:20-alpine`.
- `backend/chat-core-service/.dockerignore`: excluye `node_modules`, `dist`, `.vscode`, DB local y logs.
- `backend/chat-core-service/.env.docker`: variables para ambiente Docker.
- `backend/chat-core-service/src/main.ts`: lee `APP_PORT` y `CORS_ALLOWED_ORIGIN` desde config.
- `backend/chat-core-service/src/database.module.ts`: usa `.env.docker` cuando `NODE_ENV=docker`.
- SQLite queda en `./database/class19-chat.db` dentro del contenedor y se persiste con volumen.

### Como probar
Desde `workspace-start`:

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

Abrir:
- Health: `http://localhost:4012/health`
- Swagger: `http://localhost:4012/api`

### Conceptos
- Imagen vs contenedor.
- `Dockerfile`: `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`.
- Variables por entorno con `.env.docker`.
- Mapeo de puertos: `4012:3001`.
- SQLite persistente con volumen Docker.

---

## English

### Goal
Dockerize `chat-core-service` and run it with environment variables and a Docker volume for SQLite persistence.

### How to test
```bash
docker build -t class19-chat-core-service ./backend/chat-core-service
docker volume create class19-chat-db-data
docker run --rm --name class19-chat-core-service --env-file ./backend/chat-core-service/.env.docker -p 4012:3001 -v class19-chat-db-data:/app/database class19-chat-core-service
```
