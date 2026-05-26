# Clase 17 - Backend Config, ValidationPipe y manejo global de errores

## Espanol

### Objetivo
Partiendo del backend final de clase 16, reforzar calidad y consistencia con tres concerns transversales:
- configuracion por entorno (`ConfigService`),
- validacion global de requests (`ValidationPipe`),
- manejo global y consistente de errores (`AllExceptionsFilter`).

### Duracion sugerida
50-60 minutos.

### Estructura de la clase
- `backend/chat-core-service-start`: estado inicial (base de clase 16 end).
- `steps/step-1`: `ConfigService` por entorno para credenciales demo.
- `steps/step-2`: filtro global de excepciones con formato de error consistente.
- `steps/step-3`: `ValidationPipe` global + DTOs con `class-validator`.
- `steps/step-4`: cierre de consistencia (servicios simplificados confiando en validacion global).
- `backend/chat-core-service-end`: estado final.

### Como ejecutar
1. `cd course/class-17-backend-config-validation-errors/backend/chat-core-service-start`
2. `npm install`
3. `npm run start:dev`
4. Swagger: `http://localhost:5001/api`

### Credenciales demo (a partir de step 1)
- username: `carlos.gardel`
- password: `123456`

### Nota sobre los steps
Cada step trae `backend/` completo y acumulativo para copia tipo replace en macOS.

### Checkpoint
Backend robusto y consistente:
- configuracion externa,
- validaciones centralizadas,
- respuestas de error con formato uniforme.

---

## English

### Goal
Starting from class 16 backend end, improve robustness and consistency with three cross-cutting concerns:
- environment-based configuration (`ConfigService`),
- global request validation (`ValidationPipe`),
- centralized and consistent error handling (`AllExceptionsFilter`).

### Suggested duration
50-60 minutes.

### Class structure
- `backend/chat-core-service-start`: initial backend state (class 16 end baseline).
- `steps/step-1`: environment config for demo credentials.
- `steps/step-2`: global exception filter with consistent error response shape.
- `steps/step-3`: global validation pipe + DTO validation decorators.
- `steps/step-4`: final consistency pass (service cleanup relying on global validation).
- `backend/chat-core-service-end`: final backend state.

### Run
1. `cd course/class-17-backend-config-validation-errors/backend/chat-core-service-start`
2. `npm install`
3. `npm run start:dev`
4. Swagger: `http://localhost:5001/api`
