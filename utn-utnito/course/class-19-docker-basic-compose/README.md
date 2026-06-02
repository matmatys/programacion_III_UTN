# Clase 19 - Docker basico y docker-compose

## Espanol

### Objetivo
Tomar el frontend de clase 16 y el backend final de clase 17 para empaquetarlos con Docker y levantar el stack con Docker Compose.

La clase busca que el alumno entienda:
- que es una imagen y que es un contenedor,
- como se escribe un `Dockerfile`,
- como se pasan variables de entorno segun ambiente,
- como se publican puertos,
- como persiste SQLite usando un volumen Docker,
- como `docker-compose.yml` conecta servicios por red interna.

### Duracion sugerida
50-60 minutos.

### Estructura de la clase
- `workspace-start`: proyecto inicial sin Docker.
  - `backend/chat-core-service`: backend final de clase 17.
  - `frontend/chat-app`: frontend de clase 16.
- `steps/step-1`: backend dockerizado + SQLite persistente por volumen.
- `steps/step-2`: frontend dockerizado con build Angular + nginx.
- `steps/step-3`: stack final con `docker-compose.yml`, red, volumen y healthchecks.
- `workspace-end`: estado final con todos los steps aplicados.

### Regla de copy de steps
Cada step trae un `workspace` completo y acumulativo.

Para aplicar un step sobre el proyecto inicial:

```bash
cd course/class-19-docker-basic-compose
rsync -a --delete steps/step-N/workspace/ workspace-start/
```

Reemplazar `step-N` por `step-1`, `step-2` o `step-3`.

Esta mecanica evita problemas de macOS al copiar carpetas porque el origen siempre contiene el workspace completo.

### Como ejecutar el start local
1. Backend:
   ```bash
   cd workspace-start/backend/chat-core-service
   cp .env.example .env
   npm install
   npm run start:dev
   ```
   Swagger: `http://localhost:5001/api`

2. Frontend:
   ```bash
   cd ../../frontend/chat-app
   npm install
   npm run start
   ```
   Frontend: `http://localhost:5300`

### Como ejecutar el final con Docker Compose
```bash
cd workspace-end/chat-docker
docker compose up -d
```

URLs:
- Frontend: `http://localhost:4300`
- Backend health: `http://localhost:4012/health`
- Swagger backend: `http://localhost:4012/api`

Para ver logs en clase:
- abrir Docker Desktop,
- entrar a Containers,
- seleccionar `utn-utnito-class-19`,
- revisar los logs de `chat-core-service` y `chat-frontend`.

Nota para alumnos:
- En Windows y macOS, para este paso es requisito tener Docker Desktop instalado y corriendo.

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Nota sobre SQLite
SQLite no se levanta como un contenedor separado porque no es un servidor de base de datos: es un archivo.

En esta clase la base queda "dockerizada" usando un volumen Docker:
- archivo dentro del contenedor: `/app/database/class19-chat.db`
- volumen compose: `utn-utnito-class-19-chat-db-data`

Asi los datos sobreviven al recrear el contenedor del backend.

### Checkpoint
Stack base levantado con Docker:
- `chat-core-service` healthy,
- `chat-frontend` healthy,
- red `utn-utnito-network-class-19`,
- volumen SQLite persistente,
- frontend y Swagger accesibles desde el navegador.

---

## English

### Goal
Take the class 16 frontend and class 17 end backend, package both with Docker, and run the stack with Docker Compose.

### Suggested duration
50-60 minutes.

### Class structure
- `workspace-start`: initial non-Docker workspace.
- `steps/step-1`: Dockerized backend + persistent SQLite volume.
- `steps/step-2`: Dockerized Angular frontend served by nginx.
- `steps/step-3`: final Compose stack with network, volume and healthchecks.
- `workspace-end`: final state with all steps applied.

### Step copy rule
Each step ships a complete, accumulative `workspace`.

```bash
cd course/class-19-docker-basic-compose
rsync -a --delete steps/step-N/workspace/ workspace-start/
```

### Run final stack
```bash
cd workspace-end/chat-docker
docker compose up -d
```

URLs:
- Frontend: `http://localhost:4300`
- Backend health: `http://localhost:4012/health`
- Backend Swagger: `http://localhost:4012/api`
