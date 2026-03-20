<h1>
  <img src="../../images/utnito-logo.svg" alt="UTNito logo" width="42" align="left" style="margin-right:10px;" />
  utn-utnito full project
</h1>

## English

### Project Overview

This repository contains the practical course implementation for **Programacion III (Tecnicatura Universitaria en Programacion - UTN BA)**.

`utn-utnito` is a full-stack educational project where students build a real chat platform step by step, from UI to backend, persistence, authentication, and AI integration.

### Technologies

- Frontend: Angular + TypeScript
- Backend: NestJS + TypeScript + TypeORM
- Database: SQLite (chat-core-service)
- AI orchestration: n8n
- AI providers: OpenAI (cloud) and Ollama local via Docker (through n8n workflows)
- Infra: Docker + Docker Compose

### Navigation

- [Architecture](#architecture-en)
- [Frontend](#frontend-en)
- [Backend](#backend-en)
- [Docker](#docker-en)
- [Arquitectura](#architecture-es)
- [Frontend (ES)](#frontend-es)
- [Backend (ES)](#backend-es)
- [Docker (ES)](#docker-es)

<a id="architecture-en"></a>

### Architecture

#### High-level flow

User -> Angular app -> NestJS chat-core-service -> SQLite

For AI responses:

NestJS chat-core-service -> n8n webhook workflow -> OpenAI (cloud) or Ollama local (`chat-ollama` in Docker) -> n8n -> NestJS -> Angular

#### Main components

- `frontend/chat-app`: login + chat UI, conversations, messages, auth-aware client
- `backend/chat-core-service`: auth, chat-app BFF, conversations, messages, AI provider strategy
- `chat-docker`: compose stack to run n8n-only, full stack, and optional local Ollama (`chat-ollama`)
- `backend/n8n/workflows`: n8n workflows used by the backend AI provider

#### Ports and URLs

Local development:

- Frontend: [http://localhost:5300](http://localhost:5300)
- Backend: [http://localhost:5001](http://localhost:5001)
- Swagger: [http://localhost:5001/utn-chat-back/api](http://localhost:5001/utn-chat-back/api)

Docker stack:

- Frontend: `http://localhost:4300`
- Backend: `http://localhost:4012`
- Swagger: `http://localhost:4012/utn-chat-back/api`
- n8n: [http://localhost:5690](http://localhost:5690)
- Ollama (optional): [http://localhost:8300](http://localhost:8300)

<a id="frontend-en"></a>

### Frontend

Run the Angular app locally:

```bash
cd utn-utnito/full_project/frontend/chat-app
npm install
npm run start
```

Default local URL: `http://localhost:5300`

<a id="backend-en"></a>

### Backend

Run chat-core-service locally:

```bash
cd utn-utnito/full_project/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Backend URL: `http://localhost:5001`

Swagger UI:

- `http://localhost:5001/utn-chat-back/api`

Important note about `.env`:

- `.env` is local and not committed.
- Use `.env.example` as the template.
- By default, the backend runs in `mock` AI mode (`AI_PROVIDER=mock`).
- To use ChatGPT or Ollama through n8n, follow the Docker section.

<a id="docker-en"></a>

### Docker

Docker is used to run infrastructure and integration scenarios, especially **n8n** for AI orchestration and optional **local Ollama** runtime.

#### 1) Start only n8n (recommended first step)

```bash
cd utn-utnito/full_project/chat-docker
docker compose up -d chat-n8n
```

n8n URL: `http://localhost:5690`

#### 2) Start full stack (frontend + backend + n8n)

```bash
cd utn-utnito/full_project/chat-docker
docker compose --profile full up -d
```

#### 3) Configure ChatGPT integration (n8n + OpenAI)

1. Open n8n (`http://localhost:5690`).
2. Import workflow:
   - `backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json`
3. Configure OpenAI credentials in n8n.
4. In `backend/chat-core-service/.env.docker`, set:
   - `AI_PROVIDER=chatgpt`
   - `AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing`
5. Restart backend service.

If n8n/OpenAI fails, backend fallback behavior is controlled by `AI_ON_ERROR_FALLBACK`.

#### 4) Configure Ollama integration (n8n + Ollama)

You can run Ollama in two modes:

- **Ollama Docker** (recommended for cross-platform consistency)
- **Ollama Local** (recommended on macOS for better performance with native GPU/Metal)

##### Option A: Ollama Docker

1. Create local config file:
   - `cp backend/ollama/.env.docker.example backend/ollama/.env.docker`
2. In `backend/ollama/.env.docker`, set:
   - `MODEL_NAME=llama3.2`
3. Start optional Ollama container:
   - `docker compose --profile ollama up -d chat-ollama`
4. Import workflow:
   - `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
5. In n8n workflow (`HTTP Request - Ollama Generate Reply`), set URL:
   - `http://chat-ollama:11434/api/generate`
6. In `backend/chat-core-service/.env.docker`, set:
   - `AI_PROVIDER=ollama`
   - `AI_OLLAMA_MODEL=llama3.2`
   - `AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing`
7. Restart backend service.

##### Option B: Ollama Local (host machine)

1. Install and run Ollama on host machine (outside Docker).
2. Ensure model exists locally (for example `llama3.2`).
3. Import workflow:
   - `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
4. In n8n workflow (`HTTP Request - Ollama Generate Reply`), set URL:
   - If n8n runs in Docker: `http://host.docker.internal:11434/api/generate`
   - If n8n runs locally: `http://localhost:11434/api/generate`
5. In `backend/chat-core-service/.env.docker`, set:
   - `AI_PROVIDER=ollama`
   - `AI_OLLAMA_MODEL=llama3.2`
   - `AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing`
6. Restart backend service.

Note:
- Keep `AI_OLLAMA_MODEL` aligned with the model available in Ollama.
- `MODEL_NAME` in `backend/ollama/.env.docker` applies only to **Ollama Docker** mode.
- If you need lower memory usage, you can use a smaller model (for example `llama3.2:1b`), but response quality may be lower.

#### 5) Ollama LLMs (Suggested Models)

You can choose the model by setting:

- `MODEL_NAME` in `backend/ollama/.env.docker`
- `AI_OLLAMA_MODEL` in `backend/chat-core-service/.env.docker`

Both values must match.

Example:

```env
MODEL_NAME=llama3.2
AI_OLLAMA_MODEL=llama3.2
```

##### Small models (recommended for students)

| Model | Params | Approx RAM | Quality vs Llama 3.2 3B | Best for | Env value |
|---|---:|---:|---|---|---|
| `llama3.2:3b` | 3B | ~2-3 GB | Baseline reference | Stable baseline | `llama3.2:3b` |
| `phi4-mini` | 3.8B | ~2.5-4 GB | Better (strong reasoning) | Coherent chat, instructions | `phi4-mini` |
| `qwen2.5:3b` / `qwen3:4b` | 3B / 4B | ~1.9-3 GB | Equal or better (especially Spanish) | Natural Spanish conversation | `qwen2.5:3b` |
| `gemma2:2b` | 2B | ~1.5-2.5 GB | Very good and fast | Maximum lightness | `gemma2:2b` |

##### Medium models (up to ~6 GB RAM)

| Model | Params | Peak RAM | Typical speed* | Quality vs Llama 3.2 3B | Best for | Env value |
|---|---:|---:|---:|---|---|---|
| `llama3.1:8b` | 8B | ~5.8-6.2 GB | ~35-45 t/s | Much better | General use, coding, long chat | `llama3.1:8b` |
| `qwen3:7b` / `qwen2.5:7b` | 7B | ~5.0-5.8 GB | ~38-50 t/s | Better | Spanish + multilingual + coding | `qwen3:7b` |
| `mistral-small3:7b` | 7B | ~5.2-5.7 GB | ~45-55 t/s | Better in fluency | Fast chat, creative writing | `mistral-small3:7b` |
| `phi4:8b` | ~8B | ~5.5-6.0 GB | ~30-40 t/s | Excellent reasoning | Complex instructions, education | `phi4:8b` |
| `gemma3:9b` | 9B | ~6.0-6.5 GB | ~25-35 t/s | Very good | Higher quality if machine can handle it | `gemma3:9b` |

\* Approximate values. They depend on hardware, context length, and prompt size.

---

## Español

### Descripción del Proyecto

Este repositorio contiene el material práctico de implementación de **Programación III (Tecnicatura Universitaria en Programación - UTN BA)**.

`utn-utnito` es un proyecto full-stack educativo donde los estudiantes construyen una plataforma de chat real paso a paso: interfaz, backend, persistencia, autenticación e integración con IA.

### Tecnologías

- Frontend: Angular + TypeScript
- Backend: NestJS + TypeScript + TypeORM
- Base de datos: SQLite (chat-core-service)
- Orquestación IA: n8n
- Proveedores IA: OpenAI (cloud) y Ollama local vía Docker (mediante workflows de n8n)
- Infraestructura: Docker + Docker Compose

### Navegación

- [Arquitectura](#architecture-es)
- [Frontend](#frontend-es)
- [Backend](#backend-es)
- [Docker](#docker-es)

<a id="architecture-es"></a>

### Arquitectura

#### Flujo general

Usuario -> Angular -> NestJS chat-core-service -> SQLite

Para respuestas de IA:

NestJS chat-core-service -> webhook de n8n -> OpenAI (cloud) u Ollama local (`chat-ollama` en Docker) -> n8n -> NestJS -> Angular

#### Componentes principales

- `frontend/chat-app`: login + UI de chat, conversaciones, mensajes, cliente con autenticación
- `backend/chat-core-service`: auth, BFF de chat-app, conversaciones, mensajes, estrategia de proveedores IA
- `chat-docker`: stack de compose para levantar solo n8n, el stack completo y Ollama local opcional (`chat-ollama`)
- `backend/n8n/workflows`: workflows de n8n utilizados por el backend

#### Puertos y URLs

Desarrollo local:

- Frontend: [http://localhost:5300](http://localhost:5300)
- Backend: [http://localhost:5001](http://localhost:5001)
- Swagger: [http://localhost:5001/utn-chat-back/api](http://localhost:5001/utn-chat-back/api)

Stack con Docker:

- Frontend: `http://localhost:4300`
- Backend: `http://localhost:4012`
- Swagger: `http://localhost:4012/utn-chat-back/api`
- n8n: [http://localhost:5690](http://localhost:5690)
- Ollama (opcional): [http://localhost:8300](http://localhost:8300)

<a id="frontend-es"></a>

### Frontend

Para levantar Angular localmente:

```bash
cd utn-utnito/full_project/frontend/chat-app
npm install
npm run start
```

URL local por defecto: `http://localhost:5300`

<a id="backend-es"></a>

### Backend

Para levantar chat-core-service localmente:

```bash
cd utn-utnito/full_project/backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

URL backend: `http://localhost:5001`

Swagger:

- `http://localhost:5001/utn-chat-back/api`

Importante sobre `.env`:

- `.env` es local y no se comitea.
- `.env.example` se usa como plantilla.
- Por defecto, el backend corre en modo IA mock (`AI_PROVIDER=mock`).
- Si querés usar ChatGPT u Ollama mediante n8n, seguí la sección Docker.

<a id="docker-es"></a>

### Docker

Docker se usa para levantar infraestructura e integración, especialmente **n8n** como orquestador de IA y **Ollama local** opcional.

#### 1) Levantar solo n8n (primer paso recomendado)

```bash
cd utn-utnito/full_project/chat-docker
docker compose up -d chat-n8n
```

URL de n8n: `http://localhost:5690`

#### 2) Levantar stack completo (frontend + backend + n8n)

```bash
cd utn-utnito/full_project/chat-docker
docker compose --profile full up -d
```

#### 3) Configurar integración con ChatGPT (n8n + OpenAI)

1. Abrir n8n (`http://localhost:5690`).
2. Importar el workflow:
   - `backend/n8n/workflows/utnito/utnito_chatgpt_message_response.json`
3. Configurar credenciales de OpenAI dentro de n8n.
4. En `backend/chat-core-service/.env.docker`, definir:
   - `AI_PROVIDER=chatgpt`
   - `AI_N8N_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-prompt-processing`
5. Reiniciar el backend.

Si falla n8n/OpenAI, el fallback del backend se controla con `AI_ON_ERROR_FALLBACK`.

#### 4) Configurar integración con Ollama (n8n + Ollama)

Podés usar Ollama en dos modos:

- **Ollama Docker** (recomendado para consistencia multiplataforma)
- **Ollama Local** (recomendado en macOS por mejor performance con GPU/Metal nativa)

##### Opción A: Ollama Docker

1. Crear archivo de configuración local:
   - `cp backend/ollama/.env.docker.example backend/ollama/.env.docker`
2. En `backend/ollama/.env.docker`, definir:
   - `MODEL_NAME=llama3.2`
3. Levantar contenedor opcional de Ollama:
   - `docker compose --profile ollama up -d chat-ollama`
4. Importar workflow:
   - `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
5. En el workflow de n8n (`HTTP Request - Ollama Generate Reply`), usar URL:
   - `http://chat-ollama:11434/api/generate`
6. En `backend/chat-core-service/.env.docker`, definir:
   - `AI_PROVIDER=ollama`
   - `AI_OLLAMA_MODEL=llama3.2`
   - `AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing`
7. Reiniciar el backend.

##### Opción B: Ollama Local (host)

1. Instalar y ejecutar Ollama en la máquina host (fuera de Docker).
2. Verificar que el modelo exista localmente (por ejemplo `llama3.2`).
3. Importar workflow:
   - `backend/n8n/workflows/utnito/utnito_ollama_message_response.json`
4. En el workflow de n8n (`HTTP Request - Ollama Generate Reply`), usar URL:
   - Si n8n corre en Docker: `http://host.docker.internal:11434/api/generate`
   - Si n8n corre local: `http://localhost:11434/api/generate`
5. En `backend/chat-core-service/.env.docker`, definir:
   - `AI_PROVIDER=ollama`
   - `AI_OLLAMA_MODEL=llama3.2`
   - `AI_N8N_OLLAMA_WEBHOOK_URL=http://chat-n8n:5678/webhook/utnito-ollama-prompt-processing`
6. Reiniciar el backend.

Nota:
- Mantené `AI_OLLAMA_MODEL` alineado con el modelo disponible en Ollama.
- `MODEL_NAME` en `backend/ollama/.env.docker` aplica solo al modo **Ollama Docker**.
- Si necesitás menor consumo de memoria, podés usar un modelo más pequeño (por ejemplo `llama3.2:1b`), pero la calidad de respuesta puede ser menor.

#### 5) Ollama LLMs (Modelos sugeridos)

Podés elegir el modelo configurando:

- `MODEL_NAME` en `backend/ollama/.env.docker`
- `AI_OLLAMA_MODEL` en `backend/chat-core-service/.env.docker`

Ambos valores deben coincidir.

Ejemplo:

```env
MODEL_NAME=llama3.2
AI_OLLAMA_MODEL=llama3.2
```

##### Modelos pequeños (recomendados para estudiantes)

| Modelo | Parámetros | RAM aprox. | Calidad vs Llama 3.2 3B | Mejor para | Valor en env |
|---|---:|---:|---|---|---|
| `llama3.2:3b` | 3B | ~2-3 GB | Referencia baseline | Base estable | `llama3.2:3b` |
| `phi4-mini` | 3.8B | ~2.5-4 GB | Mejor (razonamiento fuerte) | Chat coherente, instrucciones | `phi4-mini` |
| `qwen2.5:3b` / `qwen3:4b` | 3B / 4B | ~1.9-3 GB | Igual o superior (especialmente español) | Conversación natural en español | `qwen2.5:3b` |
| `gemma2:2b` | 2B | ~1.5-2.5 GB | Muy buena y rápida | Máxima ligereza | `gemma2:2b` |

##### Modelos medios (hasta ~6 GB RAM)

| Modelo | Parámetros | RAM pico | Velocidad típica* | Calidad vs Llama 3.2 3B | Mejor para | Valor en env |
|---|---:|---:|---:|---|---|---|
| `llama3.1:8b` | 8B | ~5.8-6.2 GB | ~35-45 t/s | Muy superior | Uso general, código, chat largo | `llama3.1:8b` |
| `qwen3:7b` / `qwen2.5:7b` | 7B | ~5.0-5.8 GB | ~38-50 t/s | Superior | Español + multilenguaje + código | `qwen3:7b` |
| `mistral-small3:7b` | 7B | ~5.2-5.7 GB | ~45-55 t/s | Superior en fluidez | Chat rápido, escritura creativa | `mistral-small3:7b` |
| `phi4:8b` | ~8B | ~5.5-6.0 GB | ~30-40 t/s | Excelente razonamiento | Instrucciones complejas, educación | `phi4:8b` |
| `gemma3:9b` | 9B | ~6.0-6.5 GB | ~25-35 t/s | Muy buena | Calidad alta si la máquina aguanta | `gemma3:9b` |

\* Valores aproximados. Dependen del hardware, el contexto y el tamaño del prompt.
