# Step 1 - Prompt configurable y contexto

## Objetivo del paso
Preparar el backend para AI real sin depender todavia de un proveedor real.

En este paso el backend:
- guarda primero el mensaje del usuario,
- recupera contexto reciente de la conversacion,
- construye un prompt configurable,
- envia `prompt`, `userMessage`, `context` y `recentMessages` a n8n,
- sigue recibiendo una respuesta mock desde n8n.

## Donde copiar
`course/class-21-message-module-ai-real/workspace-start`

Nota:
- Este step se aplica copiando `steps/step-1/workspace` completo sobre `workspace-start`.

## Archivos clave
- `backend/chat-core-service/src/ai/prompt/assistant-message.prompt.ts`
- `backend/chat-core-service/src/ai/ai-provider.interface.ts`
- `backend/chat-core-service/src/ai/n8n-ai.provider.ts`
- `backend/chat-core-service/src/message/message.controller.ts`
- `backend/chat-core-service/src/message/message.service.ts`
- `backend/chat-core-service/.env.example`
- `backend/n8n/workflows/utnito/utnito_mock_message_response.json`

## Explicacion del flujo
1. El usuario envia un mensaje desde UTNito.
2. `MessageController` lee el usuario autenticado desde el JWT.
3. `MessageService` valida la conversacion.
4. Se guarda el mensaje del usuario.
5. Se buscan los ultimos mensajes segun `AI_CONTEXT_MAX_PAIRS`.
6. `N8nAiProvider` construye el prompt con personalidad y contexto.
7. n8n responde mock, pero ya recibe el payload real.
8. El backend guarda la respuesta del asistente.

## Demo sugerida
Levantar n8n desde Docker:

```bash
cd workspace-start/chat-docker
docker compose up -d chat-n8n
```

Importar y activar:

```txt
workspace-start/backend/n8n/workflows/utnito/utnito_mock_message_response.json
```

Backend local:

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

Probar:
- `http://localhost:5300`
- `http://localhost:5001/api`

## Prueba esperada del step
Enviar varios mensajes en la misma conversacion.

La respuesta debe seguir siendo mock, pero debe indicar que n8n recibio prompt y cuantos mensajes de contexto llegaron.

Frase para clase:
"Todavia no hay AI real, pero el backend ya esta pensando como si la hubiera."

## Confusiones esperables
- "Por que guardar el mensaje antes de llamar a AI?"
  - Porque el mensaje actual tambien forma parte del contexto conversacional.
- "El prompt lo arma n8n?"
  - No en esta clase. El backend arma el prompt porque conoce el contrato del producto.
- "La personalidad esta hardcodeada?"
  - No. Se configura por environment.
