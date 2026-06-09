# Class 21 workspace - step 3

Accumulated workspace after step 3.

It contains:
- Step 2 ChatGPT provider.
- `ollama` provider through n8n.
- Ollama workflow.
- Optional `chat-ollama` Docker service using Compose profile `ollama`.

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

Frontend: `http://localhost:4300`

Swagger: `http://localhost:4012/api`

n8n: `http://localhost:5690`

Ollama: `http://localhost:8300`

Import and activate:

```txt
backend/n8n/workflows/utnito/utnito_ollama_message_response.json
```
