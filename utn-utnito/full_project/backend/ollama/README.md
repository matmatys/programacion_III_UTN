# Ollama Integration Guide

## English

### Overview

This project supports two Ollama runtime modes:

- **Ollama Docker** (`chat-ollama` service in compose)
- **Ollama Local** (Ollama running directly on host machine)

Both modes are orchestrated through **n8n** workflows.

### Required Configuration Files

- `backend/n8n/.env.docker` (local, not committed)
- `backend/ollama/.env.docker` (local, not committed; only for Ollama Docker mode)
- `backend/chat-core-service/.env` or `.env.docker`

Use examples:

```bash
cp backend/n8n/.env.docker.example backend/n8n/.env.docker
cp backend/ollama/.env.docker.example backend/ollama/.env.docker
```

### Core Variables

#### n8n (`backend/n8n/.env.docker`)

```env
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
OLLAMA_BASE_URL=http://chat-ollama:11434
```

- Docker mode: `OLLAMA_BASE_URL=http://chat-ollama:11434`
- Local mode (n8n in Docker): `OLLAMA_BASE_URL=http://host.docker.internal:11434`
- Local mode (n8n local): `OLLAMA_BASE_URL=http://localhost:11434`

#### Ollama container (`backend/ollama/.env.docker`)

```env
MODEL_NAME=llama3.2
```

`MODEL_NAME` is used only when running `chat-ollama` container.

#### Backend (`backend/chat-core-service/.env.docker`)

```env
AI_PROVIDER=ollama
AI_OLLAMA_MODEL=llama3.2
AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing
```

Keep `AI_OLLAMA_MODEL` aligned with the model available in Ollama.

### Workflow

Import this workflow in n8n:

- `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`

### Run Modes

#### Option A: Ollama Docker

```bash
cd chat-docker
docker compose up -d chat-n8n
docker compose --profile ollama up -d chat-ollama
```

#### Option B: Ollama Local

1. Install/run Ollama on host machine.
2. Point `OLLAMA_BASE_URL` from n8n env to host Ollama.
3. Start `chat-n8n` (or n8n locally).

### Suggested Models

Set model names in:

- `MODEL_NAME` (`backend/ollama/.env.docker`) for Docker mode
- `AI_OLLAMA_MODEL` (`backend/chat-core-service/.env`/`.env.docker`) for backend

#### Small models

| Model | Params | Approx RAM | Quality vs Llama 3.2 3B | Best for | Env value |
|---|---:|---:|---|---|---|
| `llama3.2:3b` | 3B | ~2-3 GB | Baseline reference | Stable baseline | `llama3.2:3b` |
| `phi4-mini` | 3.8B | ~2.5-4 GB | Better (strong reasoning) | Coherent chat, instructions | `phi4-mini` |
| `qwen2.5:3b` / `qwen3:4b` | 3B / 4B | ~1.9-3 GB | Equal or better (especially Spanish) | Natural Spanish conversation | `qwen2.5:3b` |
| `gemma2:2b` | 2B | ~1.5-2.5 GB | Very good and fast | Maximum lightness | `gemma2:2b` |
| `deepseek-r1:1.5b` | 1.5B | ~1-2 GB | Lower | Fast testing | `deepseek-r1:1.5b` |

#### Medium models (up to ~6 GB RAM)

| Model | Params | Peak RAM | Typical speed* | Quality vs Llama 3.2 3B | Best for | Env value |
|---|---:|---:|---:|---|---|---|
| `llama3.1:8b` | 8B | ~5.8-6.2 GB | ~35-45 t/s | Much better | General use, coding, long chat | `llama3.1:8b` |
| `qwen3:7b` / `qwen2.5:7b` | 7B | ~5.0-5.8 GB | ~38-50 t/s | Better | Spanish + multilingual + coding | `qwen3:7b` |
| `mistral-small3:7b` | 7B | ~5.2-5.7 GB | ~45-55 t/s | Better in fluency | Fast chat, creative writing | `mistral-small3:7b` |
| `phi4:8b` | ~8B | ~5.5-6.0 GB | ~30-40 t/s | Excellent reasoning | Complex instructions, education | `phi4:8b` |
| `gemma3:9b` | 9B | ~6.0-6.5 GB | ~25-35 t/s | Very good | Higher quality if machine can handle it | `gemma3:9b` |

#### Conversational models (medium usage vs `llama3.2:latest`)

| Model | Usage vs `llama3.2:latest` | Conversational quality vs `llama3.2:latest` | Recommendation | Env value |
|---|---|---|---|---|
| `gpt-oss:20b` | Medium | Better | Recommended alternative | `gpt-oss:20b` |
| `llama3.1:8b` | Medium | Similar to better | Optional | `llama3.1:8b` |
| `deepseek-r1:8b` | Medium | Similar to lower | Not recommended (`gpt-oss:20b` performed better) | `deepseek-r1:8b` |
| `gemma3:27b` | High | Lower in these tests | Not recommended (`gpt-oss:20b` performed better) | `gemma3:27b` |

\* Approximate values. They depend on hardware, context length, and prompt size.

---

## Español

### Resumen

Este proyecto soporta dos modos de ejecución de Ollama:

- **Ollama Docker** (servicio `chat-ollama` en compose)
- **Ollama Local** (Ollama ejecutando directamente en la máquina host)

Ambos modos se orquestan mediante workflows de **n8n**.

### Archivos de configuración necesarios

- `backend/n8n/.env.docker` (local, no versionado)
- `backend/ollama/.env.docker` (local, no versionado; solo para modo Ollama Docker)
- `backend/chat-core-service/.env` o `.env.docker`

Crear desde examples:

```bash
cp backend/n8n/.env.docker.example backend/n8n/.env.docker
cp backend/ollama/.env.docker.example backend/ollama/.env.docker
```

### Variables principales

#### n8n (`backend/n8n/.env.docker`)

```env
N8N_BLOCK_ENV_ACCESS_IN_NODE=false
OLLAMA_BASE_URL=http://chat-ollama:11434
```

- Modo Docker: `OLLAMA_BASE_URL=http://chat-ollama:11434`
- Modo local (n8n en Docker): `OLLAMA_BASE_URL=http://host.docker.internal:11434`
- Modo local (n8n local): `OLLAMA_BASE_URL=http://localhost:11434`

#### Contenedor Ollama (`backend/ollama/.env.docker`)

```env
MODEL_NAME=llama3.2
```

`MODEL_NAME` se usa solo cuando se levanta el contenedor `chat-ollama`.

#### Backend (`backend/chat-core-service/.env.docker`)

```env
AI_PROVIDER=ollama
AI_OLLAMA_MODEL=llama3.2
AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing
```

Mantené `AI_OLLAMA_MODEL` alineado con el modelo disponible en Ollama.

### Workflow

Importar en n8n:

- `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`

### Modos de ejecución

#### Opción A: Ollama Docker

```bash
cd chat-docker
docker compose up -d chat-n8n
docker compose --profile ollama up -d chat-ollama
```

#### Opción B: Ollama Local

1. Instalar/ejecutar Ollama en la máquina host.
2. Apuntar `OLLAMA_BASE_URL` en el env de n8n al Ollama local.
3. Levantar `chat-n8n` (o n8n local).

### Modelos sugeridos

Configurar nombres de modelo en:

- `MODEL_NAME` (`backend/ollama/.env.docker`) para modo Docker
- `AI_OLLAMA_MODEL` (`backend/chat-core-service/.env`/`.env.docker`) para backend

#### Modelos pequeños

| Modelo | Parámetros | RAM aprox. | Calidad vs Llama 3.2 3B | Mejor para | Valor en env |
|---|---:|---:|---|---|---|
| `llama3.2:3b` | 3B | ~2-3 GB | Referencia baseline | Base estable | `llama3.2:3b` |
| `phi4-mini` | 3.8B | ~2.5-4 GB | Mejor (razonamiento fuerte) | Chat coherente, instrucciones | `phi4-mini` |
| `qwen2.5:3b` / `qwen3:4b` | 3B / 4B | ~1.9-3 GB | Igual o superior (especialmente español) | Conversación natural en español | `qwen2.5:3b` |
| `gemma2:2b` | 2B | ~1.5-2.5 GB | Muy buena y rápida | Máxima ligereza | `gemma2:2b` |
| `deepseek-r1:1.5b` | 1.5B | ~1-2 GB | Menor | Testing rápido | `deepseek-r1:1.5b` |

#### Modelos medios (hasta ~6 GB RAM)

| Modelo | Parámetros | RAM pico | Velocidad típica* | Calidad vs Llama 3.2 3B | Mejor para | Valor en env |
|---|---:|---:|---:|---|---|---|
| `llama3.1:8b` | 8B | ~5.8-6.2 GB | ~35-45 t/s | Muy superior | Uso general, código, chat largo | `llama3.1:8b` |
| `qwen3:7b` / `qwen2.5:7b` | 7B | ~5.0-5.8 GB | ~38-50 t/s | Superior | Español + multilenguaje + código | `qwen3:7b` |
| `mistral-small3:7b` | 7B | ~5.2-5.7 GB | ~45-55 t/s | Superior en fluidez | Chat rápido, escritura creativa | `mistral-small3:7b` |
| `phi4:8b` | ~8B | ~5.5-6.0 GB | ~30-40 t/s | Excelente razonamiento | Instrucciones complejas, educación | `phi4:8b` |
| `gemma3:9b` | 9B | ~6.0-6.5 GB | ~25-35 t/s | Muy buena | Calidad alta si la máquina aguanta | `gemma3:9b` |

#### Modelos conversacionales (consumo medio vs `llama3.2:latest`)

| Modelo | Consumo vs `llama3.2:latest` | Calidad conversacional vs `llama3.2:latest` | Recomendación | Valor en env |
|---|---|---|---|---|
| `gpt-oss:20b` | Medio | Mejor | Alternativa recomendada | `gpt-oss:20b` |
| `llama3.1:8b` | Medio | Similar a mejor | Opcional | `llama3.1:8b` |
| `deepseek-r1:8b` | Medio | Similar a menor | No recomendado (`gpt-oss:20b` funcionó mejor) | `deepseek-r1:8b` |
| `gemma3:27b` | Alto | Menor en estas pruebas | No recomendado (`gpt-oss:20b` funcionó mejor) | `gemma3:27b` |

\* Valores aproximados. Dependen del hardware, contexto y tamaño de prompt.
