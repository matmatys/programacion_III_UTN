# n8n workflows

## Current workflows

- `utnito/utnito_chatgpt_message_response.json`
- `utnito/utnito_ollama_message_response.json`
- `utnito/utnito_mock_message_response.json` from step 1, kept for comparison.

## ChatGPT workflow

- Exposes `POST /webhook/utnito-prompt-processing`.
- Calls OpenAI using n8n credentials.
- Returns `data.assistantMessage`.

Backend local:

```txt
AI_N8N_CHATGPT_WEBHOOK_URL=http://localhost:5690/webhook/utnito-prompt-processing
```

Backend Docker:

```txt
AI_N8N_CHATGPT_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing
```

## Ollama workflow

- Exposes `POST /webhook/utnito-ollama-prompt-processing`.
- Calls Ollama through Docker internal networking.
- Returns `data.assistantMessage`.

Backend local:

```txt
AI_N8N_OLLAMA_WEBHOOK_URL=http://localhost:5690/webhook/utnito-ollama-prompt-processing
```

Backend Docker:

```txt
AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing
```

n8n Docker to Ollama Docker:

```txt
http://chat-ollama:11434/api/generate
```

Import and activate the workflow that matches `AI_PROVIDER`.
