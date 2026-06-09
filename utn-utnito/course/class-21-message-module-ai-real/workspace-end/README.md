# Class 21 workspace - end

Final accumulated workspace for class 21.

It contains:
- Configurable assistant prompt.
- Conversation context for AI responses.
- Provider strategy: `mock`, `chatgpt`, `ollama`.
- ChatGPT through n8n.
- Ollama through n8n and Docker.
- Mock fallback when real providers fail.

## Run base stack

```bash
cd chat-docker
docker compose up -d
```

## Run with Ollama

```bash
cd chat-docker
docker compose --profile ollama up -d
```

URLs:
- Frontend: `http://localhost:4300`
- Swagger: `http://localhost:4012/api`
- Health: `http://localhost:4012/health`
- n8n: `http://localhost:5690`
- Ollama: `http://localhost:8300`

Workflows:
- `backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json`
- `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
