# Step 3 - Interceptor pre-check with automatic refresh

## Espanol

### Objetivo
Renovar `accessToken` automaticamente en el interceptor cuando detecta token vencido (pre-check antes de enviar request).

### Archivos a copiar
Copiar sobre: `course/class-15-auth-jwt-frontend-integration/frontend/c15-chat-app-start`

- `src/app` (carpeta completa de este step, acumulativa sobre Step 2)

Nota:
- Este step trae `src/app` completo para evitar borrados por reemplazo de carpetas en macOS.

### Prueba rapida
1. Loguear en frontend.
2. Esperar expiracion del access token (o reducir temporalmente su expiracion en backend para probar rapido).
3. Hacer una accion protegida (por ejemplo cargar mensajes o enviar mensaje).
4. Verificar que el interceptor intenta refresh antes de enviar la request protegida.

### Aclaracion importante
- Este step implementa pre-check + refresh en el interceptor.
- Si el access token esta vencido, el frontend intenta refresh antes de adjuntar Bearer.
- Todavia no hacemos reintento automatico despues de `401` (eso queda para una version mas avanzada).

### Cierre
Con este paso el flujo queda:
- login -> token storage -> guard/interceptor -> pre-check de expiracion -> refresh automatico previo a request.
