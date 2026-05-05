# Checklist - Clase 14 (Backend JWT)

## Backend
- [ ] `POST /auth/login` devuelve `accessToken`, `refreshToken`, `expiresIn`.
- [ ] `GET /auth/me` requiere Bearer token valido.
- [ ] `POST /auth/refresh-token` devuelve nuevo `accessToken`.
- [ ] Secret JWT configurado en `backend/chat-core-service-start/.env`.
- [ ] Swagger visible en `http://localhost:5001/api`.

## Conceptos
- [ ] Autenticacion: validar identidad (`login`).
- [ ] Autorizacion: permitir/denegar acceso (guard + Bearer).
- [ ] Stateless: backend no guarda sesion de usuario en memoria.
- [ ] Refresh token: renovar access token sin reenviar usuario/password.
