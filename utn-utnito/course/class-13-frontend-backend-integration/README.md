# Clase 13 - Integracion frontend + backend (Angular + NestJS)

## Espanol

### Objetivo
Integrar el frontend del chat con el backend mock real (en memoria) construido en clase 12.

En esta clase:
- el frontend deja de usar `MockBackendService`,
- se conecta por HTTP al backend (`localhost:5001`),
- mantiene arquitectura simple basada en `core/basic` + `core/service`.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `backend/chat-core-service`: backend NestJS para usar durante toda la clase.
- `c13-chat-app-start`: frontend base (estado final de clase 9, con mock local).
- `steps/step-1`: base de integracion HTTP + servicios API esqueleto.
- `steps/step-2`: login real contra backend.
- `steps/step-3`: listar conversaciones + listar mensajes + enviar mensaje.
- `steps/step-4`: crear, activar y archivar conversaciones.
- `c13-chat-app-end`: estado final integrado front+back.

Nota:
- En clase 13 no hay demo conceptual separado: se integra directo sobre el proyecto principal.

### Flujo de practica
1. Levantar backend:
   - `cd course/class-13-frontend-backend-integration/backend/chat-core-service`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Levantar frontend:
   - `cd ../../c13-chat-app-start`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`
3. Aplicar cambios step por step copiando solo los archivos listados en cada `steps/step-N/README.md`.

### Criterio pedagogico
- Sin signals.
- Observables simples (`subscribe`, `map`, `tap`).
- Sin manejo visual avanzado de errores/loading (eso se trabaja mas adelante).

---

## English

### Objective
Integrate the chat frontend with the real mock backend (in-memory) built in class 12.

In this class:
- frontend stops using local `MockBackendService`,
- it calls backend endpoints over HTTP (`localhost:5001`),
- it keeps a simple architecture with `core/basic` + `core/service`.

### Suggested duration
60 minutes

### Class structure
- `backend/chat-core-service`: NestJS backend used throughout the class.
- `c13-chat-app-start`: frontend baseline (class 9 final state, local mock).
- `steps/step-1`: HTTP integration base + API service skeletons.
- `steps/step-2`: real login integration.
- `steps/step-3`: conversations + messages + send message integration.
- `steps/step-4`: create, activate and archive conversation integration.
- `c13-chat-app-end`: final integrated front+back state.

Note:
- Class 13 has no separate conceptual demo project. Integration starts directly on the main app.
