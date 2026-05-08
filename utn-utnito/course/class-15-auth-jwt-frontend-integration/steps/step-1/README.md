# Step 1 - Frontend JWT integration (login + me + guard + interceptor)

## Espanol

### Objetivo
Conectar frontend con JWT real:
- guardar tokens en `sessionStorage`,
- proteger `/chat`,
- enviar Bearer automaticamente,
- cargar usuario actual con `/auth/me`.

### Pre-requisito
Backend de esta clase levantado en `http://localhost:5001`.

### Archivos a copiar
Copiar sobre: `course/class-15-auth-jwt-frontend-integration/frontend/c15-chat-app-start`

- `src/app` (carpeta completa de este step)

Nota:
- Este step es acumulativo y trae `src/app` completo para evitar borrados de carpetas al copiar en macOS.

### Flujo para probar
1. Login en frontend con:
   - username `carlos.gardel`
   - password `123456`
2. Abrir devtools -> `Application` -> `Session Storage`.
3. Verificar tokens guardados.
4. Refrescar la pagina en `/chat` y verificar que sigue autenticado.

### Conceptos
- `AuthGuard` protege rutas.
- `AuthInterceptor` agrega `Authorization: Bearer ...`.
- `AuthService` centraliza login y estado de autenticacion.
