# Step 3 - Contrato Auth

## Espanol

### Objetivo
Definir endpoint de autenticacion a nivel contrato (`login`) con camino de exito y error.

### Archivos a copiar
- `src/auth/model/auth-user.model.ts`
- `src/auth/model/auth-session.model.ts`
- `src/auth/request/login.request.ts`
- `src/auth/auth.controller.ts`
- `src/app.module.ts`

### Ejecucion del step
- Copiar estos archivos sobre `c11-api-contract-start`.
- Levantar con `npm run start:dev` o con VS Code `Launch Nest Application` (`start:debug`).

### Conceptos
- Request de login.
- Response de sesion.
- Error basico con `UnauthorizedException` (`Invalid credentials`) y validacion minima de username/password.
- Swagger como fuente de verdad del contrato.
