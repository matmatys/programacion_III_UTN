# Step 2 - n8n provider contract

## Espanol

### Objetivo
Agregar un provider HTTP para que el backend pueda llamar a un webhook de n8n y leer una respuesta normalizada.

En este paso el codigo queda preparado para n8n, pero `AI_PROVIDER` sigue en `mock` para que la app pueda probarse antes de crear el workflow.

```txt
MessageService -> AiService -> MockAiProvider
                         \
                          -> N8nAiProvider
```

### Pre-requisito
Haber aplicado step 1.

### Archivos a copiar
Copiar sobre: `course/class-20-n8n-automation-ai-mock/workspace-start`

- `workspace` completo de este step.

Comando recomendado:

```bash
cd course/class-20-n8n-automation-ai-mock
rsync -a --delete steps/step-2/workspace/ workspace-start/
```

### Cambios clave
- `package.json`: agrega `@nestjs/axios` y `axios`.
- `n8n-ai.provider.ts`: llama al webhook configurado por env.
- `n8n-ai-response.interface.ts`: documenta la respuesta normalizada.
- `ai-provider-type.enum.ts`: agrega `n8n`.
- `ai.module.ts`: registra `HttpModule` y `N8nAiProvider`.
- `.env.example`: incluye `AI_N8N_WEBHOOK_URL=http://localhost:5690/...`.
- `.env.docker`: incluye `AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/...`.

### Contrato que envia el backend
```json
{
  "action": "mock_message_request",
  "userMessage": "mensaje del usuario",
  "context": {
    "conversationId": "conv-1",
    "conversationTitle": "Consulta"
  },
  "recentMessages": []
}
```

### Contrato que espera el backend
```json
{
  "action": "mock_message_response",
  "error": false,
  "data": {
    "assistantMessage": "respuesta normalizada"
  },
  "origin": "n8n"
}
```

### Como probar
En este paso se prueba que la app sigue funcionando con mock local.

Backend:

```bash
cd workspace-start/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Frontend en otra terminal:

```bash
cd workspace-start/frontend/chat-app
npm install
npm run start
```

Abrir:
- Frontend: `http://localhost:5300`
- Swagger: `http://localhost:5001/api`

Prueba sugerida:
1. Loguear con `carlos.gardel` / `123456`.
2. Enviar un mensaje desde el frontend.
3. Confirmar que el flujo sigue respondiendo con mock local.
4. Revisar en codigo el contrato que `N8nAiProvider` enviara a n8n en el step 3.

### Nota importante
No cambiar `AI_PROVIDER=n8n` todavia si no hay workflow importado y activo.

Si se cambia antes de step 3, el backend intentara llamar a un webhook que aun no existe.

### Conceptos
- Integracion HTTP entre servicios.
- Webhook como entrada a una automatizacion.
- Contrato de request/response.
- Timeout de integracion externa.
- Separacion backend vs automation.

---

## English

### Goal
Add an HTTP provider so the backend can call an n8n webhook and parse a normalized response.

The default provider remains `mock` until the n8n workflow is created in step 3.
