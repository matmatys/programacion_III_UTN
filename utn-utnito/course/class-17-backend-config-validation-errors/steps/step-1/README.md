# Step 1 - Config por entorno con ConfigService

## Objetivo
Sacar credenciales demo hardcodeadas del `AuthService` y pasarlas a variables de entorno.

Se agrega lectura por `ConfigService` para:
- `AUTH_DEMO_USER_ID`
- `AUTH_DEMO_USERNAME`
- `AUTH_DEMO_DISPLAY_NAME`
- `AUTH_DEMO_ROLE`
- `AUTH_DEMO_PASSWORD`

## Archivos a copiar
Copiar sobre:
`course/class-17-backend-config-validation-errors/backend/chat-core-service-start`

Origen:
`course/class-17-backend-config-validation-errors/steps/step-1/backend`

Este step es acumulativo y trae `backend/` completo (replace-safe en macOS).

### Copia recomendada (macOS)
```bash
cd course/class-17-backend-config-validation-errors
rsync -a --delete steps/step-1/backend/ backend/chat-core-service-start/
```

## Probar
1. `npm install`
2. `npm run start:dev`
3. Login desde Swagger con:
   - username `carlos.gardel`
   - password `123456`

## Concepto clave
La configuracion no vive en el codigo de negocio: vive en entorno.
