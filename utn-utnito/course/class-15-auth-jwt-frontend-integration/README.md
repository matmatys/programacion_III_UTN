# Clase 15 - JWT frontend integration (guard, interceptor, refresh)

## Espanol

### Objetivo
Integrar JWT en frontend usando el backend ya preparado en clase 14:
- login real contra `/auth/login`,
- guardar tokens en `sessionStorage`,
- proteger `/chat` con guard,
- agregar `Authorization: Bearer` con interceptor,
- refrescar `accessToken` con `refreshToken` desde UI.

### Duracion sugerida
25-35 minutos.

### Estructura de la clase
- `backend/chat-core-service`: backend unico para toda la clase (equivale al end de clase 14).
- `frontend/c15-chat-app-start`: frontend base.
- `steps/step-1`: login JWT + token storage + guard + interceptor + `/auth/me`.
- `steps/step-2`: accion manual de refresh token desde UI.
- `steps/step-3`: pre-check de expiracion en interceptor + refresh automatico previo a request protegida.
- `frontend/c15-chat-app-end`: frontend final.

### Como ejecutar
1. Backend:
   - `cd course/class-15-auth-jwt-frontend-integration/backend/chat-core-service`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Frontend:
   - `cd ../../frontend/c15-chat-app-start`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Nota
En esta clase no profundizamos manejo robusto de errores UI ni reintento automatico post-`401`. Foco: integracion JWT frontend-backend.

### Aclaracion importante del estado start
En `frontend/c15-chat-app-start`, el flujo de login JWT contra backend no esta completo todavia.
La integracion completa de login (`/auth/login` + token storage + `/auth/me`) se implementa en `Step 1`.

---

## English

### Objective
Integrate JWT in frontend using the backend already prepared in class 14:
- real login against `/auth/login`,
- store tokens in `sessionStorage`,
- protect `/chat` with a guard,
- inject `Authorization: Bearer` with an interceptor,
- refresh `accessToken` from UI using `refreshToken`.

### Suggested duration
25-35 minutes.

### Class structure
- `backend/chat-core-service`: single backend for the whole class (same state as class 14 end).
- `frontend/c15-chat-app-start`: frontend baseline.
- `steps/step-1`: JWT login + token storage + guard + interceptor + `/auth/me`.
- `steps/step-2`: manual refresh-token action from UI.
- `steps/step-3`: interceptor expiration pre-check + automatic refresh before protected requests.
- `frontend/c15-chat-app-end`: final frontend state.

### Run
1. Backend:
   - `cd course/class-15-auth-jwt-frontend-integration/backend/chat-core-service`
   - `npm install`
   - `npm run start:dev`
   - Swagger: `http://localhost:5001/api`
2. Frontend:
   - `cd ../../frontend/c15-chat-app-start`
   - `npm install`
   - `npm run start`
   - Frontend: `http://localhost:5300`

### Test credentials
- username: `carlos.gardel`
- password: `123456`

### Important start-state clarification
In `frontend/c15-chat-app-start`, JWT login flow against backend is not fully integrated yet.
The complete login integration (`/auth/login` + token storage + `/auth/me`) is implemented in `Step 1`.
