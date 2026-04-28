# Step 1 - HTTP base + API service skeleton

## Espanol

### Objetivo
Preparar el frontend para consumir backend real sin cambiar todavia la logica de login/chat.

### Archivos a copiar
- `src/app/app.module.ts`
- `src/app/core/basic/response-message.interface.ts`
- `src/app/core/basic/response-object.interface.ts`
- `src/app/core/model/auth-session.interface.ts`
- `src/app/core/model/create-message-response.interface.ts`
- `src/app/core/service/base-api.service.ts`
- `src/app/core/service/auth-api.service.ts`
- `src/app/core/service/chat-api.service.ts`

### Conceptos
- `provideHttpClient()` en `AppModule`.
- `ResponseObject<T>` como contrato compartido frontend-backend.
- `BaseApiService` para centralizar `get/post/patch`.
- Servicios API como esqueleto para completar en pasos siguientes.

### Nota
En este paso, el login/chat todavia usan mock local. La integracion real empieza en step 2.
