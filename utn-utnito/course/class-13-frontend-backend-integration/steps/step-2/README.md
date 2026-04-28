# Step 2 - Login real contra backend

## Espanol

### Objetivo
Conectar el login del frontend con `POST /auth/login` del backend NestJS.

### Archivos a copiar
- `src/app/core/service/auth-api.service.ts`
- `src/app/core/service/auth.service.ts`
- `src/app/login/login.component.ts`

### Conceptos
- `AuthApiService` hace la llamada HTTP.
- `AuthService` guarda session de usuario en memoria del frontend.
- `LoginComponent` pasa de sync a async con `subscribe`.
- Primer flujo completo front -> back -> front.

### Prueba rapida
Credenciales:
- username: `carlos.gardel`
- password: `123456`
