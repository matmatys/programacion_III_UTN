# Clase 18 - Frontend: estados de UI (loading, error, vacio)

## Espanol

### Objetivo
Tomar la lista de conversaciones del chat y manejar de forma explicita los tres estados que normalmente quedan rotos:
- `loading`: skeleton mientras se piden los datos,
- `empty`: mensaje + CTA cuando el usuario no tiene conversaciones,
- `error`: mensaje + reintento cuando la API falla.

Tambien se aprovecha para practicar el patron de componentes UI reutilizables (skeleton, empty, error) y manejo declarativo de estados con `*ngIf` + `<ng-container>`.

### Duracion sugerida
25-35 minutos.

### Estructura de la clase
- `backend/chat-core-service`: backend unico para toda la clase (estado final de clase 17, con `ConfigService`, `ValidationPipe` y filtro global de errores).
- `frontend/c18-chat-app-start`: frontend base (igual al estado final de clase 16). La lista de conversaciones solo maneja el happy path.
- `steps/step-1`: estado `loading` con `SkeletonListComponent` y flag en `ChatService`.
- `steps/step-2`: estado `empty` con `EmptyStateComponent` para el caso "no hay conversaciones todavia".
- `steps/step-3`: estado `error` con `ErrorStateComponent` + boton de reintentar.
- `frontend/c18-chat-app-end`: estado final con los tres estados aplicados.

### Como ejecutar
1. Backend:
   - `cd course/class-18-frontend-loading-error-empty-states/backend/chat-core-service`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Frontend:
   - `cd ../../frontend/c18-chat-app-start`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Nota sobre los steps
Cada step trae `src/app` completo y acumulativo. Para aplicar un step, copiar la carpeta `src/app` del step sobre `frontend/c18-chat-app-start/src/app` (replace).

### Como probar cada estado durante la clase
- **Loading**: el step-1 incluye un `delay(5000)` artificial en `ChatService.loadConversations()`, asi que basta con recargar el chat para ver el skeleton 5s. (En codigo real ese delay se borra; alternativa sin tocar codigo: DevTools -> `Network` -> `Throttling` -> `Slow 3G`.)
- **Empty**: borrar el archivo `backend/chat-core-service/database/class18-chat.db` y reiniciar el backend; loguear con un usuario sin conversaciones.
- **Error**: bajar el backend (`Ctrl+C`) y recargar el chat. Despues levantar el backend y hacer click en "Reintentar".

### Checkpoint
Frontend que cubre los cuatro escenarios de una vista asincronica:
- loading visible y predecible,
- empty con accion clara para el usuario,
- error con mensaje humano + retry,
- success (happy path) intacto.

---

## English

### Goal
Take the chat conversations list and explicitly handle the three states that usually fall through the cracks:
- `loading`: skeleton while data is being fetched,
- `empty`: message + CTA when the user has no conversations,
- `error`: message + retry when the API fails.

Also practices the reusable UI component pattern (skeleton, empty, error) and declarative state handling with `*ngIf` + `<ng-container>`.

### Suggested duration
25-35 minutes.

### Class structure
- `backend/chat-core-service`: single backend for the whole class (class 17 end state).
- `frontend/c18-chat-app-start`: baseline frontend (class 16 end state). Only the happy path is handled.
- `steps/step-1`: `loading` state with `SkeletonListComponent` and a flag in `ChatService`.
- `steps/step-2`: `empty` state with `EmptyStateComponent` for the "no conversations yet" case.
- `steps/step-3`: `error` state with `ErrorStateComponent` + retry button.
- `frontend/c18-chat-app-end`: final state with the three states applied.

### Run
1. Backend:
   - `cd course/class-18-frontend-loading-error-empty-states/backend/chat-core-service`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Frontend:
   - `cd ../../frontend/c18-chat-app-start`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`

### Test credentials
- username: `carlos.gardel`
- password: `123456`

### Note on steps
Each step ships a full, accumulative `src/app` folder. To apply a step, copy the step's `src/app` over `frontend/c18-chat-app-start/src/app` (replace).

### How to test each state during class
- **Loading**: step-1 ships an artificial `delay(5000)` in `ChatService.loadConversations()`, so just reload the chat to see the skeleton for 5s. (In real code that delay is removed; alternative without touching code: DevTools -> `Network` -> `Throttling` -> `Slow 3G`.)
- **Empty**: delete `backend/chat-core-service/database/class18-chat.db` and restart the backend; log in with a user that has no conversations.
- **Error**: stop the backend (`Ctrl+C`) and reload the chat. Bring the backend back up and click "Reintentar".

### Checkpoint
Frontend covering the four scenarios of an async view:
- loading visible and predictable,
- empty with a clear action for the user,
- error with a human-friendly message + retry,
- success (happy path) untouched.
