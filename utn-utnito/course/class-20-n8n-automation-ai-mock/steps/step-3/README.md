# Step 3 - Docker Compose with n8n workflow

## Espanol

### Objetivo
Sumar `chat-n8n` al stack Docker Compose, importar un workflow mock y activar `AI_PROVIDER=n8n`.

Flujo final:

```txt
Browser -> chat-frontend -> chat-core-service -> chat-n8n webhook -> mock response
```

### Pre-requisito
Haber aplicado step 1 y step 2.

Para este paso, en Windows y macOS es requisito tener Docker Desktop instalado y corriendo.

### Archivos a copiar
Copiar sobre: `course/class-20-n8n-automation-ai-mock/workspace-start`

- `workspace` completo de este step.

Comando recomendado:

```bash
cd course/class-20-n8n-automation-ai-mock
rsync -a --delete steps/step-3/workspace/ workspace-start/
```

### Cambios clave
- `chat-docker/docker-compose.yml`: agrega servicio `chat-n8n`.
- `backend/n8n/.env.docker`: configuracion de n8n para Docker.
- `backend/n8n/workflows/utnito/utnito_mock_message_response.json`: workflow importable.
- `backend/chat-core-service/.env.example`: `AI_PROVIDER=n8n` y URL local a n8n Docker.
- `backend/chat-core-service/.env.docker`: `AI_PROVIDER=n8n` y URL interna `chat-n8n:5678`.

### Matriz de environments
Backend corriendo local desde VS Code:

```env
AI_PROVIDER=n8n
AI_N8N_WEBHOOK_URL=http://localhost:5690/webhook/utnito-mock-message-response
```

Backend corriendo dentro de Docker Compose:

```env
AI_PROVIDER=n8n
AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-mock-message-response
```

Frontend local:

```txt
http://localhost:5300 -> http://localhost:5001
```

Frontend Docker:

```txt
http://localhost:4300 -> http://localhost:4012
```

El frontend no llama a n8n directamente. La integracion con n8n vive en el backend.

### Como probar con Docker Compose
Si quedaron contenedores manuales de steps anteriores, bajarlos:

```bash
docker stop class20-step1-chat-core-service
```

Desde `workspace-start/chat-docker`:

```bash
docker compose up -d
```

Abrir n8n:

```txt
http://localhost:5690
```

Importar el workflow:

```txt
workspace-start/backend/n8n/workflows/utnito/utnito_mock_message_response.json
```

Activar el workflow.

Abrir:
- Frontend: `http://localhost:4300`
- Swagger: `http://localhost:4012/api`
- Health: `http://localhost:4012/health`

Ver estado:

```bash
docker compose ps
```

Detener:

```bash
docker compose down
```

Detener y borrar volumenes:

```bash
docker compose down -v
```

### Logs en Docker Desktop
1. Abrir Docker Desktop.
2. Ir a Containers.
3. Entrar al stack `utn-utnito-class-20`.
4. Revisar logs de `chat-core-service`.
5. Revisar logs de `chat-n8n`.
6. Revisar logs de `chat-frontend`.

### Como probar backend local + n8n Docker
Tambien se puede levantar solo n8n con Compose y correr el backend desde VS Code.

Terminal 1:

```bash
cd workspace-start/chat-docker
docker compose up -d chat-n8n
```

Importar y activar el workflow en `http://localhost:5690`.

Terminal 2:

```bash
cd workspace-start/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Frontend local:

```bash
cd workspace-start/frontend/chat-app
npm install
npm run start
```

Abrir `http://localhost:5300` y enviar un mensaje.

### Conceptos
- n8n como orquestador.
- Webhook como contrato de entrada.
- Response normalizada.
- Backend como responsable del contrato de chat.
- Automation como capa intercambiable.
- DNS interno Docker: `chat-n8n`.
- Puerto publicado para host/browser: `localhost:5690`.

### Checkpoint
Envio de mensaje desde UTNito con respuesta de asistente pasando por n8n mock.

---

## English

### Goal
Add `chat-n8n` to Docker Compose, import the mock workflow, and switch the backend to `AI_PROVIDER=n8n`.

### Run
```bash
cd workspace-start/chat-docker
docker compose up -d
```

Open n8n at `http://localhost:5690`, import the workflow, activate it, then test the chat from `http://localhost:4300`.
