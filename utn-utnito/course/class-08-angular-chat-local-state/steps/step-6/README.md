# Step 6 - Filtro simple de conversaciones

## Espanol

### Objetivo
Filtrar conversaciones no archivadas por titulo usando estado local.

### Archivos a copiar
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

### Conceptos
- Campo `conversationFilter`.
- Estado derivado con `filteredConversations`.
- `*ngIf` para "sin resultados".

### Validacion
Al escribir en el filtro, la lista de chats activos se reduce dinamicamente.
