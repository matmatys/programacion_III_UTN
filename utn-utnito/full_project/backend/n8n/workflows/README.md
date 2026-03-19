# n8n workflows

This folder will contain n8n workflows for `utn-utnito`.

## Current workflow

- `utnito/utnito_chatgpt_message_response.json`
- `utnito/utnito_ollama_message_response.json`

## What this workflow does

- Exposes `POST /webhook/utnito-prompt-processing`.
- Exposes `POST /webhook/utnito-ollama-prompt-processing`.
- Receives a body with:
  - `prompt`
  - `userMessage`
  - `ollamaModel` (for Ollama workflow)
- Calls OpenAI (cloud) or Ollama local via Docker (`chat-ollama`) from n8n (depending on imported workflow).
- Returns a normalized JSON response to backend:
  - success:
    - `action: "chatGPT_message_response"` or `action: "ollama_message_response"`
    - `error: false`
    - `data.assistantMessage`
    - `origin: "n8n"`
  - error:
    - `action: "chatGPT_message_response"` or `action: "ollama_message_response"`
    - `error: true`
    - `data.errorMessage`, `data.errorDetails`, trace fields
    - `origin: "n8n"`

## Setup notes

1. Import the workflow in n8n:
   - ChatGPT: `utnito/utnito_chatgpt_message_response.json`
   - Ollama: `utnito/utnito_ollama_message_response.json`
2. Configure OpenAI credentials in n8n if you use ChatGPT.
3. For Ollama workflow, configure the Ollama host in n8n to use Docker network endpoint:
   - `http://chat-ollama:11434`
4. Ensure backend env points to:
   - ChatGPT local: `AI_N8N_WEBHOOK_URL=http://localhost:5690/webhook/utnito-prompt-processing`
   - ChatGPT docker: `AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing`
   - Ollama local: `AI_N8N_OLLAMA_WEBHOOK_URL=http://localhost:5690/webhook/utnito-ollama-prompt-processing`
   - Ollama docker: `AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing`
