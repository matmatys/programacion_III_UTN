# Class 19 workspace end

Final workspace for class 19.

It contains:
- Dockerized backend.
- Dockerized frontend.
- Docker Compose stack in `chat-docker/docker-compose.yml`.
- SQLite persistence through a named Docker volume.

## Run

```bash
cd chat-docker
docker compose up -d
```

Frontend: `http://localhost:4300`

Swagger: `http://localhost:4012/api`

Health: `http://localhost:4012/health`

Use Docker Desktop to inspect containers and logs.
