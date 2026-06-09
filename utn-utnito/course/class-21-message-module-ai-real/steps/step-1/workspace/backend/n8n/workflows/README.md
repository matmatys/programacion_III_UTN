# n8n workflows - Step 1

## Current workflow

- `utnito/utnito_mock_message_response.json`

## What this workflow does

- Exposes `POST /webhook/utnito-mock-message-response`.
- Receives the real AI payload shape:
  - `prompt`
  - `userMessage`
  - `context`
  - `recentMessages`
- Returns a mock normalized response:
  - `error: false`
  - `data.assistantMessage`
  - `origin: "n8n"`

## Backend URLs

Backend local from VS Code:

```txt
AI_N8N_WEBHOOK_URL=http://localhost:5690/webhook/utnito-mock-message-response
```

Backend running inside Docker:

```txt
AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-mock-message-response
```

Import the workflow in n8n and activate it before testing.
