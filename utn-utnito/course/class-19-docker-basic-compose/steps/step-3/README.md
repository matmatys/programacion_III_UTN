# Step 3 - Docker Compose stack

## Espanol

### Objetivo
Reemplazar comandos `docker build` y `docker run` sueltos por un `docker-compose.yml` que levanta backend, frontend, red, volumen y healthchecks.

### Pre-requisito
Haber aplicado step 1 y step 2.

### Archivos a copiar
Copiar sobre: `course/class-19-docker-basic-compose/workspace-start`

- `workspace` completo de este step.

Comando recomendado:
```bash
cd course/class-19-docker-basic-compose
rsync -a --delete steps/step-3/workspace/ workspace-start/
```

### Cambios clave
- `chat-docker/docker-compose.yml`: define el stack.
- Servicio `chat-core-service`:
  - build desde `../backend/chat-core-service`,
  - puerto `4012:3001`,
  - volumen `chat-db-data:/app/database`,
  - healthcheck contra `/health`.
- Servicio `chat-frontend`:
  - build desde `../frontend/chat-app`,
  - puerto `4300:80`,
  - `depends_on` esperando backend healthy.
- Red: `utn-utnito-network-class-19`.
- Volumen: `utn-utnito-class-19-chat-db-data`.

### Como probar
Desde `workspace-start/chat-docker`:

```bash
docker compose up -d
```

Abrir:
- Frontend: `http://localhost:4300`
- Health: `http://localhost:4012/health`
- Swagger: `http://localhost:4012/api`

Ver logs:
- Abrir Docker Desktop.
- Ir a Containers.
- Entrar al stack `utn-utnito-class-19`.
- Revisar logs de `chat-core-service` y `chat-frontend`.

Ver estado:
```bash
docker compose ps
```

Detener:
```bash
docker compose down
```

Detener y borrar volumen:
```bash
docker compose down -v
```

Requisito para alumnos:
- En Windows y macOS, para este paso es necesario tener Docker Desktop instalado y corriendo.

### Conceptos
- Compose como definicion reproducible del ambiente.
- Service name como DNS interno dentro de la red Docker.
- Puertos publicados vs puertos internos.
- Volumen nombrado para persistencia.
- Healthcheck.
- `depends_on` con `condition: service_healthy`.
- Logs desde Docker Desktop para observar que pasa dentro de cada servicio.

### Checkpoint
Stack base levantado:
- backend healthy,
- frontend healthy,
- red creada con nombre `utn-utnito-network-class-19`,
- DB persistente en volumen,
- login funcional desde `http://localhost:4300`.

---

## English

### Goal
Replace manual `docker build` and `docker run` commands with a Docker Compose stack.

### Run
```bash
cd workspace-start/chat-docker
docker compose up -d
```
