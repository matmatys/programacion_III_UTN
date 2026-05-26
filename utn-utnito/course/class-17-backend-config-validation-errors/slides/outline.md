# Slides Outline - Clase 17 (Config + ValidationPipe + Global Errors)

1. Objetivo de la clase
- Robustecer backend con concerns transversales.

2. Punto de partida
- Base: clase 16 end.
- JWT + SQLite + servicios funcionando.

3. Step 1 - Config por entorno
- `ConfigService`.
- Credenciales demo desde `.env`.
- Evitar hardcode en `AuthService`.

4. Step 2 - Manejo global de errores
- `AllExceptionsFilter`.
- Mismo formato de error para todo el backend.
- `throw exception` en service/controller + formateo central.

5. Step 3 - ValidationPipe global
- Validacion antes del controller.
- `class-validator` en DTOs.
- `whitelist`, `transform`, `forbidNonWhitelisted`.

6. Step 4 - Consistencia final
- Limpieza de validaciones duplicadas.
- Servicios enfocados en reglas de negocio.

7. Demo final
- Caso feliz completo.
- Errores de negocio.
- Errores de validacion.

8. Cierre
- Configuracion, validacion y errores = calidad transversal.
