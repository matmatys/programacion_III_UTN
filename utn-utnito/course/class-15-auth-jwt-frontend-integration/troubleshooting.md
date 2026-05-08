# Troubleshooting - Clase 15 (Frontend JWT integration)

## Login falla con 401
- Verificar backend corriendo en `http://localhost:5001`.
- Revisar credenciales:
  - username `carlos.gardel`
  - password `123456`

## `/chat` redirige a `/login`
- Revisar que exista `utnito_access_token` en `sessionStorage`.
- Repetir login y comprobar que `AuthGuard` detecte sesion.

## Requests protegidas sin Bearer
- Revisar `src/app/core/auth/auth.interceptor.ts`.
- Confirmar que `app.module.ts` registra el interceptor en providers.

## Refresh token falla
- Verificar que exista `utnito_refresh_token` en `sessionStorage`.
- Probar primero `POST /auth/refresh-token` desde Swagger para validar backend.
