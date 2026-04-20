# Step 4 - Contrato Conversations

## Espanol

### Objetivo
Definir recurso `conversations` con endpoints REST principales.

### Archivos a copiar
- `src/conversation/model/conversation-status.enum.ts`
- `src/conversation/model/conversation.model.ts`
- `src/conversation/request/create-conversation.request.ts`
- `src/conversation/request/update-conversation-title.request.ts`
- `src/conversation/conversation.controller.ts`
- `src/app.module.ts`

### Ejecucion del step
- Copiar estos archivos sobre `c11-api-contract-start`.
- Levantar con `npm run start:dev` o con VS Code `Launch Nest Application` (`start:debug`).

### Conceptos
- Recurso como sustantivo (`conversations`).
- Endpoints para listar, crear, renombrar, activar y archivar.
- Estado de entidad (`ACTIVE`, `INACTIVE`, `ARCHIVED`).
- Errores de validacion/not found con exceptions HTTP simples.
