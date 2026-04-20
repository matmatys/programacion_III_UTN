# Step 5 - Contrato Messages

## Espanol

### Objetivo
Definir contrato de mensajes por conversacion y flujo basico de envio.

### Archivos a copiar
- `src/message/model/message-role.enum.ts`
- `src/message/model/message.model.ts`
- `src/message/request/create-message.request.ts`
- `src/message/message.controller.ts`
- `src/app.module.ts`

### Ejecucion del step
- Copiar estos archivos sobre `c11-api-contract-start`.
- Levantar con `npm run start:dev` o con VS Code `Launch Nest Application` (`start:debug`).

### Conceptos
- Endpoint nested: `/conversations/:conversationId/messages`.
- Request de creacion de mensaje.
- Response de flujo mock (mensaje usuario + mensaje assistant).
- DELETE de mensaje como ejemplo de contrato adicional.
- Errores de validacion/not found con exceptions HTTP simples.
