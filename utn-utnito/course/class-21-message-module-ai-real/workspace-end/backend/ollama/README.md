# Ollama for class 21

This folder contains the minimal Docker setup used by the `chat-ollama` service.

## Files

- `Dockerfile`: starts from `ollama/ollama`.
- `start_model.sh`: starts Ollama and ensures the configured model exists.
- `.env.docker`: model used by the container.
- `.env.docker.example`: example configuration.

## Default model

```env
MODEL_NAME=llama3.2
```

Keep this aligned with the backend variable:

```env
AI_OLLAMA_MODEL=llama3.2
```

## Run with Docker Compose

From `chat-docker`:

```bash
docker compose --profile ollama up -d
```

The first run can take time because the model may need to be downloaded.

## URLs

- From the host machine: `http://localhost:8300`
- From n8n inside Docker: `http://chat-ollama:11434`

The n8n workflow calls:

```txt
http://chat-ollama:11434/api/generate
```
