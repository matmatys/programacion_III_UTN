# Class 21 workspace - step 2

Accumulated workspace after step 2.

It contains:
- Step 1 prompt and context flow.
- `chatgpt` provider through n8n.
- OpenAI n8n workflow.
- Controlled fallback to local mock.

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
backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json
```

Configure OpenAI credentials in n8n before testing `AI_PROVIDER=chatgpt`.
