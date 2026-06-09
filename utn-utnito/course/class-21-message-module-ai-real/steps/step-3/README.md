# Step 3 - Ollama via n8n

## Objetivo del paso
Agregar un segundo proveedor real de AI, local, usando Ollama orquestado por n8n.

En este paso:
- se agrega `OllamaAiProvider`,
- se agrega `AI_N8N_OLLAMA_WEBHOOK_URL`,
- se agrega `AI_OLLAMA_MODEL`,
- se suma `chat-ollama` a Docker Compose con profile `ollama`,
- se importa un workflow n8n que llama la API local de Ollama.

## Donde copiar
`course/class-21-message-module-ai-real/workspace-start`

Nota:
- Este step es acumulativo e incluye step 1 y step 2.

## Archivos clave
- `backend/chat-core-service/src/ai/ollama-ai.provider.ts`
- `backend/chat-core-service/src/ai/ai.service.ts`
- `backend/chat-core-service/.env.example`
- `backend/chat-core-service/.env.docker`
- `backend/ollama/Dockerfile`
- `backend/ollama/start_model.sh`
- `backend/ollama/.env.docker`
- `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
- `chat-docker/docker-compose.yml`

## Explicacion del flujo
1. `AiService` lee `AI_PROVIDER=ollama`.
2. `OllamaAiProvider` llama el webhook configurado en `AI_N8N_OLLAMA_WEBHOOK_URL`.
3. El payload incluye `prompt`, `userMessage`, contexto y `ollamaModel`.
4. n8n llama `http://chat-ollama:11434/api/generate`.
5. Ollama responde localmente.
6. n8n normaliza la salida como `data.assistantMessage`.
7. Si Ollama falla, el backend vuelve a mock por fallback.

## Demo sugerida con Docker Compose
Levantar stack completo con profile Ollama:

```bash
cd workspace-start/chat-docker
docker compose --profile ollama up -d
```

Ver estado:

```bash
docker compose ps
```

Abrir n8n:

```txt
http://localhost:5690
```

Importar y activar:

```txt
workspace-start/backend/n8n/workflows/utnito/utnito_ollama_message_response.json
```

Probar:
- Frontend: `http://localhost:4300`
- Swagger: `http://localhost:4012/api`
- Ollama publicado: `http://localhost:8300`

## Prueba esperada del step
1. Enviar mensaje desde UTNito.
2. Confirmar respuesta generada por Ollama.
3. Detener `chat-ollama` desde Docker Desktop.
4. Enviar otro mensaje.
5. Confirmar fallback a mock.

Frase para clase:
"ChatGPT y Ollama son proveedores distintos, pero el modulo de mensajes ve el mismo contrato."

## Confusiones esperables
- "Por que usamos profile?"
  - Porque Ollama puede ser pesado y no siempre se quiere levantar por defecto.
- "Por que n8n usa `chat-ollama` y no `localhost`?"
  - Porque n8n corre en un container y se comunica por la red interna de Docker.
- "Puedo cambiar el modelo?"
  - Si. Hay que mantener alineados `AI_OLLAMA_MODEL` y `MODEL_NAME`.
