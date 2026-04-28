# Step 3 - Conversaciones + mensajes + send (integracion base)

## Espanol

### Objetivo
Conectar el flujo principal de chat con backend real:
- listar conversaciones,
- cargar mensajes,
- enviar mensaje.

### Archivos a copiar
- `src/app/core/service/chat-api.service.ts`
- `src/app/core/service/chat.service.ts`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`

### Conceptos
- `GET /conversations`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`
- `subscribe` para actualizar estado local en frontend.
- Mapping backend -> frontend (`conversationId` -> `id`, `messageId` -> `id`).

### Nota
`New chat` y `Archive` quedan para step 4.
