# Step 2 - Seleccion de conversacion desde sidebar

## Espanol

### Objetivo
Conectar la sidebar con estado local para seleccionar una conversacion activa.

### Archivos a copiar
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`

### Conceptos
- Estado local en componente (`conversations`, `selectedConversationId`).
- `*ngFor` para renderizar la lista de chats.
- `(click)` para cambiar conversacion activa.

### Validacion
Al hacer click en un chat de la izquierda, cambia el titulo activo en el header.
