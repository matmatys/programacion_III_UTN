# Step 2 - Manejo global de errores (consistencia)

## Objetivo
Agregar `AllExceptionsFilter` global para que todos los errores tengan un formato uniforme usando `ResponseBuilder`.

## Archivos a copiar
Copiar sobre:
`course/class-17-backend-config-validation-errors/backend/chat-core-service-start`

Origen:
`course/class-17-backend-config-validation-errors/steps/step-2/backend`

Este step es acumulativo y trae `backend/` completo.

### Copia recomendada (macOS)
```bash
cd course/class-17-backend-config-validation-errors
rsync -a --delete steps/step-2/backend/ backend/chat-core-service-start/
```

## Probar
1. Levantar backend.
2. Forzar errores desde Swagger (por ejemplo ID inexistente).
3. Verificar que la respuesta de error siempre mantiene estructura consistente.

## Concepto clave
Los servicios/controller lanzan exceptions; el filtro global decide el formato final del error HTTP.
