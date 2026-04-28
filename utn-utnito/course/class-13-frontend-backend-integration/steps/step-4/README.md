# Step 4 - New chat + activate + archive

## Espanol

### Objetivo
Completar la integracion de acciones sobre conversaciones.

### Archivos a copiar
- `src/app/core/service/chat-api.service.ts`
- `src/app/core/service/chat.service.ts`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`

### Conceptos
- `POST /conversations` (crear nueva conversacion).
- `PATCH /conversations/:id/activate` (activar seleccionada).
- `PATCH /conversations/:id/archive` (archivar conversacion).
- Refresco de cache local de mensajes en frontend.

### Resultado
Con este paso, el frontend queda integrado de punta a punta con el backend mock real de la clase 12.
