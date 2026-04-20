# Step 2 - Base de contrato y respuesta consistente

## Espanol

### Objetivo
Definir formato base de respuesta para toda la API y aplicarlo a health.

### Archivos a copiar
- `src/basic/response-message.model.ts`
- `src/basic/response-object.model.ts`
- `src/health/health.controller.ts`

### Ejecucion del step
- Copiar estos archivos sobre `c11-api-contract-start`.
- Levantar con `npm run start:dev` o con VS Code `Launch Nest Application` (`start:debug`).

### Conceptos
- Contrato de respuesta uniforme (`success`, `responseMessage`, `serverTime`, `data`).
- Diferencia entre respuesta de exito y error a nivel basico.
- Consistencia de contrato antes de crecer endpoints.
- Uso de `constructor` en `ResponseMessage` y `ResponseObject` para evitar `!` en propiedades.
- En este step la respuesta se arma manualmente; el helper `responseBuilder` se presenta recien en el cierre (step 6).
