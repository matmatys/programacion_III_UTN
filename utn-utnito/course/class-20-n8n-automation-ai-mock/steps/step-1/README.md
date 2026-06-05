# Step 1 - Backend AiService local mock

## Espanol

### Objetivo
Agregar una capa `AiService` al backend para que el envio de mensajes no tenga una respuesta hardcodeada dentro de `MessageService`.

En este primer paso el provider es local y mock:

```txt
MessageService -> AiService -> MockAiProvider
```

Esto permite preparar la arquitectura sin depender todavia de n8n.

### Pre-requisito
Tener aplicado el workspace inicial de clase 20.

### Archivos a copiar
Copiar sobre: `course/class-20-n8n-automation-ai-mock/workspace-start`

- `workspace` completo de este step.

Comando recomendado:

```bash
cd course/class-20-n8n-automation-ai-mock
rsync -a --delete steps/step-1/workspace/ workspace-start/
```

### Cambios clave
- `backend/chat-core-service/src/ai`: nuevo modulo de AI.
- `ai-provider.interface.ts`: contrato interno para generar respuestas.
- `mock-ai.provider.ts`: respuesta local mock.
- `ai.service.ts`: resuelve que provider usar.
- `message.module.ts`: importa `AiModule`.
- `message.service.ts`: delega la respuesta del asistente al `AiService`.
- `.env.example` y `.env.docker`: agregan `AI_PROVIDER=mock`.

### Como probar local
Desde el backend:

```bash
cd workspace-start/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Abrir:
- Swagger: `http://localhost:5001/api`
- Health: `http://localhost:5001/health`

Prueba sugerida:
1. Login con `carlos.gardel` / `123456`.
2. Autorizar Swagger con el access token.
3. Crear o usar una conversacion.
4. Enviar un mensaje.
5. Ver que la respuesta del asistente viene del mock local.

### Como probar con Docker
Desde `workspace-start`:

```bash
docker build -t class20-step1-chat-core-service ./backend/chat-core-service
docker volume create class20-step1-chat-db-data
docker run --rm \
  --name class20-step1-chat-core-service \
  --env-file ./backend/chat-core-service/.env.docker \
  -p 4012:3001 \
  -v class20-step1-chat-db-data:/app/database \
  class20-step1-chat-core-service
```

Abrir:
- Swagger: `http://localhost:4012/api`
- Health: `http://localhost:4012/health`

### Conceptos
- Separacion de responsabilidades.
- Provider pattern simple.
- Mock local como estrategia de desarrollo.
- Contrato interno antes de integrar servicios externos.

---

## English

### Goal
Add an `AiService` layer to the backend so assistant replies are delegated outside `MessageService`.

### How to test locally
```bash
cd workspace-start/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Open Swagger at `http://localhost:5001/api` and send a chat message.
