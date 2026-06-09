# Step 2 - ChatGPT via n8n y fallback

## Objetivo del paso
Conectar el flujo de mensajes con ChatGPT a traves de n8n y validar fallback controlado a mock.

En este paso:
- se reemplaza el provider generico `n8n` por `chatgpt`,
- se agrega una abstraccion comun para providers que llaman webhooks n8n,
- se importa un workflow de n8n que llama OpenAI,
- se mantiene `MockAiProvider` como fallback local.

## Donde copiar
`course/class-21-message-module-ai-real/workspace-start`

Nota:
- Este step es acumulativo e incluye lo de step 1.

## Archivos clave
- `backend/chat-core-service/src/ai/abstract-ai.provider.ts`
- `backend/chat-core-service/src/ai/chatgpt-ai.provider.ts`
- `backend/chat-core-service/src/ai/ai.service.ts`
- `backend/chat-core-service/src/ai/model/ai-provider-type.enum.ts`
- `backend/chat-core-service/.env.example`
- `backend/chat-core-service/.env.docker`
- `backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json`

## Explicacion del flujo
1. `AiService` lee `AI_PROVIDER=chatgpt`.
2. `ChatGptAiProvider` arma el payload con `prompt`, `userMessage` y contexto.
3. El backend llama `AI_N8N_CHATGPT_WEBHOOK_URL`.
4. n8n recibe el webhook productivo.
5. n8n llama OpenAI con credenciales configuradas en n8n.
6. n8n normaliza la respuesta como `data.assistantMessage`.
7. Si falla ChatGPT o n8n, `AiService` usa mock si `AI_ON_ERROR_FALLBACK=mock`.

## Demo sugerida
Levantar n8n:

```bash
cd workspace-start/chat-docker
docker compose up -d chat-n8n
```

Abrir n8n:

```txt
http://localhost:5690
```

Importar workflow:

```txt
workspace-start/backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json
```

Configurar credenciales OpenAI en n8n, seleccionarlas en el nodo `OpenAI - Generate Reply` y activar el workflow.

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

## Prueba esperada del step
1. Enviar un mensaje y confirmar respuesta real.
2. Romper temporalmente `AI_N8N_CHATGPT_WEBHOOK_URL` o desactivar el workflow.
3. Enviar otro mensaje.
4. Confirmar que el backend responde con mock y no rompe el flujo.

Frase para clase:
"El provider real puede fallar; el modulo de mensajes no tiene por que caerse completo."

## Confusiones esperables
- "Donde va la API key de OpenAI?"
  - En las credenciales de n8n, no en el backend.
- "El backend sabe que modelo usa OpenAI?"
  - En esta clase, el modelo se configura en el workflow de n8n.
- "Fallback significa ignorar errores?"
  - No. El backend loguea la falla y responde con una alternativa controlada.
