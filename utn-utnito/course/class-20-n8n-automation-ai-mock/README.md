# Clase 20 - n8n automation AI mock

## Espanol

### Objetivo
Extender el stack de clase 19 para que el envio de mensajes pueda pasar por una capa de automatizacion con n8n.

La clase busca que el alumno entienda:
- como separar la logica del backend de una integracion externa,
- como definir un contrato de entrada y salida entre servicios,
- como usar un provider local mock para no depender de infraestructura,
- como llamar un webhook de n8n desde NestJS,
- como levantar n8n con Docker Compose,
- como distinguir URLs para local, navegador y red interna Docker.

Importante:
- En esta clase n8n devuelve una respuesta mock.
- No se conecta OpenAI todavia.
- La clase siguiente puede reutilizar este contrato para armar el prompt real.

### Duracion sugerida
50-60 minutos.

### Estructura de la clase
- `workspace-start`: stack final de clase 19 como punto de partida.
  - `backend/chat-core-service`: backend Dockerizado con SQLite.
  - `frontend/chat-app`: frontend Angular Dockerizado.
  - `chat-docker`: Compose base de backend + frontend.
- `steps/step-1`: `AiService` con provider local mock.
- `steps/step-2`: provider n8n + contrato normalizado de request/response.
- `steps/step-3`: `chat-n8n` en Docker Compose + workflow mock importable.
- `workspace-end`: estado final con todos los steps aplicados.

### Regla de copy de steps
Cada step trae un `workspace` completo y acumulativo.

Para aplicar un step sobre el proyecto inicial:

```bash
cd course/class-20-n8n-automation-ai-mock
rsync -a --delete steps/step-N/workspace/ workspace-start/
```

Reemplazar `step-N` por `step-1`, `step-2` o `step-3`.

Esta mecanica permite copiar y pegar sobre `workspace-start` haciendo replace en macOS.

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
- n8n: `http://localhost:5690`

Workflow a importar en n8n:

```txt
workspace-end/backend/n8n/workflows/utnito/utnito_mock_message_response.json
```

Despues de importarlo, activar el workflow para que el backend pueda usar el webhook productivo.

### Matriz de URLs
- Frontend local: llama al backend local en `http://localhost:5001`.
- Frontend Docker: llama al backend publicado en `http://localhost:4012`.
- Backend local desde VS Code: llama a n8n Docker por `http://localhost:5690/webhook/utnito-mock-message-response`.
- Backend Docker: llama a n8n por red interna Docker en `http://chat-n8n:5678/webhook/utnito-mock-message-response`.

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Checkpoint
Envio de mensaje desde UTNito con respuesta de asistente pasando por n8n en modo mock:
- `chat-core-service` healthy,
- `chat-frontend` healthy,
- `chat-n8n` corriendo,
- workflow mock importado y activo,
- frontend accesible desde el navegador,
- respuesta del asistente normalizada desde n8n.

---

## English

### Goal
Extend the class 19 stack so message sending can go through an n8n automation layer.

Students learn how to:
- isolate backend logic from an external automation service,
- define a service-to-service payload contract,
- keep a local mock provider for development,
- call an n8n webhook from NestJS,
- run n8n with Docker Compose,
- distinguish localhost URLs from internal Docker DNS.

Important:
- n8n returns a mock response in this class.
- OpenAI integration is intentionally left for the next class.

### Suggested duration
50-60 minutes.

### Class structure
- `workspace-start`: class 19 final stack.
- `steps/step-1`: local mock `AiService`.
- `steps/step-2`: n8n provider + normalized contract.
- `steps/step-3`: Compose stack with `chat-n8n` and importable mock workflow.
- `workspace-end`: final state with all steps applied.

### Step copy rule
Each step ships a complete, accumulative `workspace`.

```bash
cd course/class-20-n8n-automation-ai-mock
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
- n8n: `http://localhost:5690`
