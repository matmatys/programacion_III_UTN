# Slides Outline - Clase 15 (Frontend JWT integration)

1. Objetivo de la clase
- Integrar JWT frontend con backend ya listo.

2. Modelo mental
- Login -> guardar tokens -> interceptor agrega Bearer -> guard protege rutas.

3. Step 1
- `AuthApiService` + `AuthService` para login y `/auth/me`.
- `TokenStorageService` en `sessionStorage`.
- `AuthGuard` y `AuthInterceptor`.

4. Step 2
- Boton de refresh token en UI.
- Llamada a `/auth/refresh-token` y reemplazo de access token.

5. Demo
- Login correcto.
- Persistencia de sesion en refresh de pagina.
- Refresh manual desde sidebar.

6. Cierre
- Flujo JWT completo backend + frontend listo.
