# Troubleshooting - Clase 14 (Backend JWT)

## 401 Unauthorized en `/auth/me` o endpoints protegidos
- Revisar que exista `Authorization: Bearer <accessToken>`.
- Volver a ejecutar `POST /auth/login` y copiar un token nuevo.

## Error `AUTH_JWT_SECRET is not configured`
- Revisar archivo `backend/chat-core-service-start/.env`.
- Debe existir `AUTH_JWT_SECRET=...`.

## `refresh-token` devuelve invalid token
- Usar el `refreshToken` recibido en `POST /auth/login`.
- Verificar que no haya espacios extra al copiar token.

## Swagger no abre
- Revisar que backend este corriendo en puerto `5001`.
- URL esperada: `http://localhost:5001/api`.
