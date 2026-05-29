# Foro - Clase 17 (Backend Config + ValidationPipe + Global Errors)

## Que construimos hoy
- Configuracion por entorno con `ConfigService`.
- Validacion global de requests con `ValidationPipe`.
- Manejo global y consistente de errores con `AllExceptionsFilter`.

## Ideas clave
- Config no hardcodeada.
- Validacion declarativa en DTOs.
- Error handling centralizado para mantener contrato uniforme.

## Evidencias sugeridas
- Screenshot de Swagger con login exitoso.
- Screenshot de error de validacion (`400`).
- Screenshot de error de negocio (ej. `404`).

## Dudas para traer a la proxima clase
- Diferencia entre error de validacion y error de negocio.
- Donde conviene validar: DTO o service.
- Como escalar codigos de error por dominio.
