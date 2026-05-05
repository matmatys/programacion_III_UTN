# Clase 14 - Auth JWT backend (login, me, refresh)

## Espanol

### Objetivo
Construir y probar JWT del lado backend sobre el mock de chat:
- `POST /auth/login`
- `GET /auth/me` protegido con Bearer
- `POST /auth/refresh-token`
- validacion de token con `JwtStrategy` + `JwtAuthGuard`.

### Duracion sugerida
30-40 minutos.

### Estructura de la clase
- `backend/chat-core-service-start`: backend base para arrancar.
- `steps/step-1`: login + me protegido + strategy/guard + secret en `.env`.
- `steps/step-2`: refresh token endpoint.
- `backend/chat-core-service-end`: backend final de referencia.

### Como ejecutar
1. `cd course/class-14-auth-jwt/backend/chat-core-service-start`
2. `npm install`
3. `npm run start:dev`
4. Swagger: `http://localhost:5001/api`

### Credenciales de prueba
- username: `carlos.gardel`
- password: `123456`

### Nota
El frontend JWT se trabaja en la clase 15, usando como base el backend final de esta clase.

---

## English

### Objective
Build and test backend JWT on top of the chat mock backend:
- `POST /auth/login`
- Bearer-protected `GET /auth/me`
- `POST /auth/refresh-token`
- token validation with `JwtStrategy` + `JwtAuthGuard`.

### Suggested duration
30-40 minutes.

### Class structure
- `backend/chat-core-service-start`: initial backend.
- `steps/step-1`: login + protected me + strategy/guard + `.env` secret.
- `steps/step-2`: refresh token endpoint.
- `backend/chat-core-service-end`: final backend reference.

### Run
1. `cd course/class-14-auth-jwt/backend/chat-core-service-start`
2. `npm install`
3. `npm run start:dev`
4. Swagger: `http://localhost:5001/api`

### Test credentials
- username: `carlos.gardel`
- password: `123456`

### Note
Frontend JWT integration is moved to class 15, using this class backend final state.
