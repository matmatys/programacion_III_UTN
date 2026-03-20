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
- [Ollama Guide](backend/ollama/README.md)
- [Arquitectura](#architecture-es)
- [Frontend (ES)](#frontend-es)
- [Backend (ES)](#backend-es)
- [Docker (ES)](#docker-es)
- [Guia de Ollama](backend/ollama/README.md)

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

Use the dedicated guide:

- [`backend/ollama/README.md`](./backend/ollama)

This guide includes:

- Ollama Docker vs Ollama Local setup
- n8n + backend environment variables
- workflow import and webhook wiring
- suggested Ollama models by resource profile

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
- [Guia de Ollama](backend/ollama/README.md)

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

Usá la guía dedicada:

- [`backend/ollama/README.md`](./backend/ollama)

Esa guía incluye:

- configuración Ollama Docker vs Ollama Local
- variables de entorno de n8n y backend
- import del workflow y conexión del webhook
- modelos sugeridos de Ollama según perfil de recursos
