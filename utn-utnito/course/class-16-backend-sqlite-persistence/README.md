# Clase 16 - Persistencia backend con SQLite (TypeORM)

## Espanol

### Objetivo
Tomar el backend JWT de clase 15 y migrar conversaciones/mensajes de memoria a persistencia SQLite.

Al finalizar:
- las conversaciones se guardan en DB,
- los mensajes se guardan en DB,
- el frontend sigue funcionando sin cambios de arquitectura,
- el estado persiste entre reinicios del backend.

### Duracion sugerida
50-60 minutos.

### Estructura de la clase
- `frontend/c16-chat-app`: unico frontend de clase 16 (misma base que clase 15 end).
- `backend/chat-core-service-start`: backend inicial (JWT + datos en memoria).
- `steps/step-1`: infraestructura DB (`DatabaseModule`, `.env`, dependencias).
- `steps/step-2`: entidades + registro en modulos.
- `steps/step-3`: `ConversationService` migrado a repositorio.
- `steps/step-4`: `MessageService` migrado a repositorio (cierre de persistencia).
- `backend/chat-core-service-end`: estado final.

### Como ejecutar
1. Backend:
   - `cd course/class-16-backend-sqlite-persistence/backend/chat-core-service-start`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Frontend:
   - `cd ../../frontend/c16-chat-app`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Nota didactica
No usamos seed en esta clase.
Si la DB arranca vacia, el alumno crea conversaciones desde frontend y ve persistencia real.

### Opcional: ver tablas SQLite con DBeaver
Si quieren inspeccionar la base de datos durante la clase, pueden usar DBeaver:
- Download: https://dbeaver.io/download/
- Archivo SQLite de esta clase: `backend/chat-core-service-start/database/class16-chat.db`

---

## English

### Goal
Take the class 15 JWT backend and migrate conversations/messages from in-memory state to SQLite persistence.

By the end:
- conversations are persisted in DB,
- messages are persisted in DB,
- frontend keeps working without architecture changes,
- data survives backend restarts.

### Suggested duration
50-60 minutes.

### Class structure
- `frontend/c16-chat-app`: single frontend for class 16 (same baseline as class 15 end).
- `backend/chat-core-service-start`: initial backend (JWT + in-memory data).
- `steps/step-1`: DB infrastructure (`DatabaseModule`, `.env`, dependencies).
- `steps/step-2`: entities + module registration.
- `steps/step-3`: `ConversationService` migrated to repository.
- `steps/step-4`: `MessageService` migrated to repository (persistence closure).
- `backend/chat-core-service-end`: final backend state.

### Optional: inspect SQLite tables with DBeaver
- Download: https://dbeaver.io/download/
- SQLite file for this class: `backend/chat-core-service-start/database/class16-chat.db`
