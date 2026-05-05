# Step 2 - Backend refresh token endpoint

## Espanol

### Objetivo
Completar backend auth con `POST /auth/refresh-token`.

### Archivos a copiar
Copiar sobre: `course/class-14-auth-jwt/backend/chat-core-service-start`

- `.env.example`
- `package.json`
- `src/` (carpeta completa de este step, acumulativa sobre Step 1)

Nota:
- Este step trae `src` completo para evitar pérdida de archivos al reemplazar carpetas en macOS.
- Después de copiar, Swagger se prueba en `http://localhost:5001/api`.
- Los decoradores Swagger vienen comentados en inglés.

### Probar en Swagger
1. Ejecutar `POST /auth/login` y copiar `refreshToken`.
2. Ejecutar `POST /auth/refresh-token` con:
```json
{
  "refreshToken": "<token>"
}
```
3. Verificar que responde nuevo `accessToken`.

### Concepto clave
- `accessToken` se usa para llamadas protegidas.
- `refreshToken` se usa para pedir un nuevo `accessToken` sin login completo.
- Objetivo práctico: evitar pedir usuario/password en cada request.
