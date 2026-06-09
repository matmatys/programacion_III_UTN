# n8n workflows - Step 2

## Current workflows

- `utnito/utnito_mock_message_response.json`
- `utnito/utnito_chatgpt_message_response.json`

## ChatGPT workflow

- Exposes `POST /webhook/utnito-prompt-processing`.
- Receives:
  - `prompt`
  - `userMessage`
  - `context`
  - `recentMessages`
- Calls OpenAI from n8n.
- Returns a normalized response:
  - `error: false`
  - `data.assistantMessage`
  - `origin: "n8n"`

If OpenAI or the workflow fails, n8n returns:

```json
{
  "error": true,
  "data": {
    "errorMessage": "reason",
    "errorDetails": "details"
  },
  "origin": "n8n"
}
```

The backend can fallback to mock when `AI_ON_ERROR_FALLBACK=mock`.

## Backend URLs

Backend local from VS Code:

```txt
AI_N8N_CHATGPT_WEBHOOK_URL=http://localhost:5690/webhook/utnito-prompt-processing
```

Backend running inside Docker:

```txt
AI_N8N_CHATGPT_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing
```

Import the ChatGPT workflow, configure OpenAI credentials in n8n and activate it before testing.
