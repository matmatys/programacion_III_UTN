# Step 2 - Frontend refresh token action

## Espanol

### Objetivo
Agregar un disparador simple en UI para renovar `accessToken` usando `refreshToken`.

### Archivos a copiar
Copiar sobre: `course/class-15-auth-jwt-frontend-integration/frontend/c15-chat-app-start`

- `src/app` (carpeta completa de este step, acumulativa sobre Step 1)

Nota:
- Este step trae `src/app` completo para evitar borrados por reemplazo de carpetas en macOS.

### Prueba rapida
1. Loguear en frontend.
2. En sidebar, click en `Refresh token`.
3. Ver mensaje `Access token refreshed.`.

### Aclaracion importante
- En este step el refresh es manual (boton).
- El interceptor actual solo agrega `Authorization: Bearer ...`.
- Todavia no hacemos refresh automatico al recibir `401`.

### Cierre
Con este paso queda listo el refresh manual en UI.
En el Step 3 agregamos refresh automatico previo a request protegida (pre-check en interceptor).
