# Step 1 - Backend JWT base (login + me + guard)

## Espanol

### Objetivo
Agregar JWT en el backend para cubrir:
- login con tokens,
- endpoint protegido `me`,
- guard/strategy Bearer,
- secret en `.env`.

### Archivos a copiar
Copiar sobre: `course/class-14-auth-jwt/backend/chat-core-service-start`

- `.env.example`
- `package.json`
- `src/` (carpeta completa de este step)

Nota:
- Este step usa `src` completo para evitar borrados por reemplazo de carpeta en macOS.
- Una vez copiados sobre `backend/chat-core-service-start`, probar en Swagger `http://localhost:5001/api`.
- Los decoradores Swagger vienen comentados en inglés para distinguir documentación vs lógica Nest.

### Probar en Swagger
URL: `http://localhost:5001/api`

1. `POST /auth/login` con:
```json
{
  "username": "carlos.gardel",
  "password": "123456"
}
```
2. Copiar `accessToken`.
3. Click en `Authorize` y pegar: `Bearer <accessToken>`.
4. Probar `GET /auth/me` y luego `GET /conversations`.

### Conceptos
- `JwtStrategy` valida token Bearer.
- `JwtAuthGuard` protege endpoints.
- El secret JWT vive en `.env` (`AUTH_JWT_SECRET`).

### Explicacion simple de Strategy vs Guard
- `JwtStrategy`: define **como** se valida el token (de donde se lee, con que secret se verifica, y que hacer con el payload).
- `JwtAuthGuard`: define **donde** se exige token (en los endpoints que tienen `@UseGuards(JwtAuthGuard)`).

### Como sabe la strategy si un token es valido
La `JwtStrategy` configura tres reglas:
- **De donde leer token**: `ExtractJwt.fromAuthHeaderAsBearerToken()` busca `Authorization: Bearer <token>`.
- **Con que clave validar firma**: `secretOrKey` usa `AUTH_JWT_SECRET`.
- **Si acepta expirados o no**: `ignoreExpiration: false` (si vencio, se rechaza).

Si esas validaciones tecnicas pasan, Nest ejecuta `validate(payload)`.
En `validate(payload)` se hace la validacion de negocio extra (por ejemplo `tokenType` y usuario esperado).
Si falla cualquier paso, responde `401 Unauthorized`.

### Que significan estos decoradores en el controller
- `@ApiBearerAuth('jwtAuth')`: solo documentacion Swagger (muestra el candado y el campo para pegar Bearer token).
- `@UseGuards(JwtAuthGuard)`: seguridad real en runtime (si el token es invalido o falta, Nest bloquea la request).

### Que hace AuthService con el token
- En `login(...)` valida credenciales.
- Si son correctas, arma un `payload` con datos del usuario (`sub`, `username`, `role`, etc.).
- Luego firma ese payload para generar `accessToken` y `refreshToken` usando la secret de `.env`.
- Idea simple: el token permite no enviar usuario/password en cada request, solo en el login.

### Importante: JWT no encripta por defecto
- En este ejemplo el token se **firma**, no se encripta.
- Algoritmo por defecto de firma: `HS256` (HMAC-SHA256), salvo que configures otro.
- El payload se puede leer; lo que no se puede hacer sin secret es modificarlo y mantener firma valida.

---

## English

### Goal
Add backend JWT base for login + protected `me` endpoint.

### Verify
Swagger URL: `http://localhost:5001/api`
