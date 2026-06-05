# Class 20 workspace - step 1

Accumulated workspace after step 1.

It contains:
- Dockerized backend from class 19 end.
- Dockerized frontend from class 19 end.
- Docker Compose stack from class 19 end.
- SQLite persistence through a named Docker volume.
- Backend AI abstraction with local mock provider.

## Run

```bash
cd chat-docker
docker compose up -d
```

Frontend: `http://localhost:4300`

Swagger: `http://localhost:4012/api`

Health: `http://localhost:4012/health`

Use Docker Desktop to inspect containers and logs.
