# Step 3 - ValidationPipe global + DTO validation

## Objetivo
Agregar validacion global de requests en `main.ts` y reglas declarativas en DTOs con `class-validator`.

Se aplica:
- `ValidationPipe` global (`whitelist`, `transform`, `forbidNonWhitelisted`)
- Decoradores como `@IsString()` y `@IsNotEmpty()`
- `@Transform(...)` para trim normalizado de strings

## Archivos a copiar
Copiar sobre:
`course/class-17-backend-config-validation-errors/backend/chat-core-service-start`

Origen:
`course/class-17-backend-config-validation-errors/steps/step-3/backend`

Este step es acumulativo y trae `backend/` completo.

### Copia recomendada (macOS)
```bash
cd course/class-17-backend-config-validation-errors
rsync -a --delete steps/step-3/backend/ backend/chat-core-service-start/
```

## Probar
Desde Swagger:
- enviar body sin campos requeridos,
- enviar campos extra no permitidos,
- enviar strings vacios o con espacios.

Se debe obtener `400` con mensaje de validacion.

## Concepto clave
`ValidationPipe` es concepto de backend (NestJS): valida entrada antes de ejecutar controller/service.
