# Checklist - Clase 15 (Frontend JWT integration)

## Backend prerequisite
- [ ] Backend corriendo en `http://localhost:5001`.
- [ ] Swagger responde en `http://localhost:5001/api`.

## Frontend
- [ ] Login real contra backend funcionando.
- [ ] Tokens guardados en `sessionStorage`.
- [ ] Interceptor agrega `Authorization: Bearer ...`.
- [ ] Ruta `/chat` protegida por guard.
- [ ] Boton de refresh token actualiza access token.

## Conceptos
- [ ] Frontend no guarda password luego del login.
- [ ] Access token viaja en headers.
- [ ] Refresh token renueva sesion sin relogin completo.
