# Clase 21 - Message module + AI real

## Espanol

### Objetivo
Cerrar el proyecto UTNito conectando el modulo de mensajes con proveedores reales de AI orquestados por n8n.

La clase busca que el alumno entienda:
- como armar un prompt configurable desde el backend,
- como incluir contexto reciente de conversacion,
- como mantener una estrategia de providers (`mock`, `chatgpt`, `ollama`),
- como conectar ChatGPT via n8n sin exponer credenciales en el backend,
- como conectar Ollama local via n8n y Docker,
- como validar fallback controlado a mock ante fallas.

Importante:
- El frontend no cambia de responsabilidad: sigue llamando al backend.
- n8n orquesta la integracion AI.
- El backend mantiene el contrato del producto y la persistencia del chat.

### Duracion sugerida
60-75 minutos.

### Estructura de la clase
- `workspace-start`: estado final de clase 20.
  - `backend/chat-core-service`: backend con `AiService`, provider n8n mock y SQLite.
  - `frontend/chat-app`: frontend Angular ya integrado.
  - `chat-docker`: Compose con backend, frontend y n8n.
- `steps/step-1`: prompt configurable + contexto conversacional + n8n mock.
- `steps/step-2`: provider `chatgpt` via n8n + fallback a mock.
- `steps/step-3`: provider `ollama` via n8n + servicio `chat-ollama` con Docker profile.
- `workspace-end`: estado final con todos los steps aplicados.

### Regla de copy de steps
Cada step trae un `workspace` completo y acumulativo.

Para aplicar un step sobre el proyecto inicial:

```bash
cd course/class-21-message-module-ai-real
rsync -a --delete steps/step-N/workspace/ workspace-start/
```

Reemplazar `step-N` por `step-1`, `step-2` o `step-3`.

Esta mecanica permite copiar y pegar sobre `workspace-start` haciendo replace en macOS.

### Como ejecutar el start local
Backend:

```bash
cd workspace-start/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Swagger: `http://localhost:5001/api`

Frontend:

```bash
cd workspace-start/frontend/chat-app
npm install
npm run start
```

Frontend: `http://localhost:5300`

### Como ejecutar el final con Docker Compose
Stack base:

```bash
cd workspace-end/chat-docker
docker compose up -d
```

Stack con Ollama:

```bash
cd workspace-end/chat-docker
docker compose --profile ollama up -d
```

URLs:
- Frontend: `http://localhost:4300`
- Backend health: `http://localhost:4012/health`
- Swagger backend: `http://localhost:4012/api`
- n8n: `http://localhost:5690`
- Ollama API publicada: `http://localhost:8300`

Workflows a importar en n8n:

```txt
workspace-end/backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json
workspace-end/backend/n8n/workflows/utnito/utnito_ollama_message_response.json
```

Despues de importarlos, activar el workflow que corresponda al provider elegido.

### Providers
- `AI_PROVIDER=mock`: respuesta local del backend.
- `AI_PROVIDER=chatgpt`: backend -> n8n -> OpenAI -> n8n -> backend.
- `AI_PROVIDER=ollama`: backend -> n8n -> Ollama local -> n8n -> backend.

Fallback:

```txt
AI_ON_ERROR_FALLBACK=mock
```

Si `chatgpt` u `ollama` fallan, el backend devuelve una respuesta mock para no romper el flujo del modulo de mensajes.

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Checkpoint
Chat respondiendo con AI real y fallback funcionando:
- prompt configurable,
- contexto reciente incluido,
- workflow ChatGPT importado y activo,
- workflow Ollama importado y activo para prueba local,
- respuesta normalizada con `data.assistantMessage`,
- fallback a mock validado ante error de provider.

---

## English

### Goal
Close the UTNito project by connecting the message module with real AI providers orchestrated by n8n.

Students learn how to:
- build a configurable prompt in the backend,
- include recent conversation context,
- keep a provider strategy (`mock`, `chatgpt`, `ollama`),
- connect ChatGPT through n8n,
- connect local Ollama through n8n and Docker,
- validate controlled fallback to mock when real providers fail.

### Class structure
- `workspace-start`: class 20 final state.
- `steps/step-1`: configurable prompt + conversation context + n8n mock.
- `steps/step-2`: `chatgpt` provider through n8n + mock fallback.
- `steps/step-3`: `ollama` provider through n8n + optional Docker profile.
- `workspace-end`: final accumulated state.

### Run final stack
```bash
cd workspace-end/chat-docker
docker compose --profile ollama up -d
```

URLs:
- Frontend: `http://localhost:4300`
- Backend Swagger: `http://localhost:4012/api`
- n8n: `http://localhost:5690`
- Ollama: `http://localhost:8300`
