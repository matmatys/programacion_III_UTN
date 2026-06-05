# Class 20 workspace start

Initial workspace for class 20.

It contains:
- Dockerized backend from class 19 end.
- Dockerized frontend from class 19 end.
- Docker Compose stack from class 19 end.
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
