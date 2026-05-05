# Slides Outline - Clase 14 (Backend JWT)

1. Objetivo de la clase
- Pasar de auth mock a auth JWT real en backend.

2. Modelo mental
- `login` -> backend firma tokens -> cliente envia Bearer -> backend valida token.

3. Conceptos clave
- Autenticacion vs autorizacion.
- Access token vs refresh token.
- Stateless.

4. Step 1
- Secret en `.env`.
- `JwtStrategy` + `JwtAuthGuard`.
- Endpoints: `/auth/login`, `/auth/me`.

5. Step 2
- Endpoint `/auth/refresh-token`.
- Renovar access token sin reenviar credenciales.

6. Demo
- Login correcto.
- `me` protegido con Bearer.
- Refresh token desde Swagger.

7. Cierre
- Backend JWT listo para integrar en frontend (clase 15).
