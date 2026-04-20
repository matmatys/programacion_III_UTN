# Clase 11 - Contrato API y Swagger-first

## Espanol

### Objetivo
Definir el contrato API antes de implementar backend real: endpoints, request/response y recursos principales (`auth`, `conversations`, `messages`) usando Swagger.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c11-api-contract-start`: proyecto principal inicial (backend minimo con Swagger + health).
- `steps/step-1/http-methods-swagger-demo`: mini demo separada para explicar HTTP methods + request/response.
- `steps/step-2`: base de contrato (`ResponseObject`, `ResponseMessage`) y formato consistente de respuesta (manual, sin helper).
- `steps/step-3`: contrato de `auth` (`/auth/login`) con exito/error basico.
- `steps/step-4`: contrato de `conversations`.
- `steps/step-5`: contrato de `messages`.
- `steps/step-6`: snapshot final de clase (incluye `responseBuilder` como refactor).
- `c11-api-contract-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo conceptual:
   - `cd course/class-11-api-contract-swagger-first/steps/step-1/http-methods-swagger-demo`
   - `npm install`
   - `npm run start:dev`
   - Abrir `http://localhost:5001/api`
2. Proyecto principal:
   - `cd ../../../c11-api-contract-start`
   - `npm install`
   - `npm run start:dev`
   - Abrir `http://localhost:5001/api`
3. Aplicar cambios step por step copiando solo los archivos listados en cada `steps/step-N/README.md`.

Nota: step 1 y proyecto principal usan el mismo puerto (`5001`), ejecutar uno por vez.

### VS Code Play/F5
- `step-1/http-methods-swagger-demo`, `c11-api-contract-start` y `c11-api-contract-end` incluyen `.vscode/launch.json`.
- Configuracion: `Launch Nest Application` (usa `npm run start:debug`).
- En steps 2..6, ejecutar sobre `c11-api-contract-start` luego de copiar cambios.

### Entregable
- Contrato API claro y visible en Swagger.
- Endpoints de `auth`, `conversations` y `messages` definidos con request/response.
- Respuestas de exito y error a nivel basico (sin manejo avanzado).

---

## English

### Objective
Define the API contract before backend implementation: endpoints, request/response payloads, and core resources (`auth`, `conversations`, `messages`) using Swagger.

### Suggested Duration
60 minutes

### Class Structure
- `c11-api-contract-start`: main starter backend (Swagger + health endpoint).
- `steps/step-1/http-methods-swagger-demo`: standalone demo for HTTP methods + request/response.
- `steps/step-2`: contract foundation (`ResponseObject`, `ResponseMessage`) with manual responses.
- `steps/step-3`: `auth` contract.
- `steps/step-4`: `conversations` contract.
- `steps/step-5`: `messages` contract.
- `steps/step-6`: final snapshot (`responseBuilder` refactor included).
- `c11-api-contract-end`: expected final state.
