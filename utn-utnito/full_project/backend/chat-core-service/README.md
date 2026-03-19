# chat-core-service

NestJS + TypeScript backend service for `utn-utnito`.

## Quick Start

```bash
cd utn-utnito/full_project/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Main local URLs:

- Backend: `http://localhost:5001`
- Swagger: `http://localhost:5001/utn-chat-back/api`

## Environment Setup

- `.env` is local and **not** committed.
- `.env.example` is committed as the setup template.
- Create your local `.env` by copying:

```bash
cp .env.example .env
```

By default, AI provider is mock (`AI_PROVIDER=mock`).
Available provider values are:
- `mock`
- `chatgpt` (through n8n + OpenAI)
- `ollama` (through n8n + local Docker Ollama service `chat-ollama`)

If you want ChatGPT or Ollama through n8n, follow the Docker and n8n integration guide in the central project README:

- [full_project/README.md](../../README.md)
