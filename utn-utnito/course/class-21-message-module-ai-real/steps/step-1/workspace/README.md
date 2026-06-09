# Class 21 workspace - step 1

Accumulated workspace after step 1.

It contains:
- Class 20 final stack.
- Prompt builder with configurable assistant personality.
- Message context sent to AI providers.
- n8n mock workflow receiving the real prompt payload.

## Run

```bash
cd chat-docker
docker compose up -d
```

Frontend: `http://localhost:4300`

Swagger: `http://localhost:4012/api`

n8n: `http://localhost:5690`

Import and activate:

```txt
backend/n8n/workflows/utnito/utnito_mock_message_response.json
```
