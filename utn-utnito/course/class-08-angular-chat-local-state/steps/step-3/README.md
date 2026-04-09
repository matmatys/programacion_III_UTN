# Step 3 - Mensajes por conversacion

## Espanol

### Objetivo
Renderizar mensajes de la conversacion activa y mostrar estados vacios.

### Archivos a copiar
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`

### Conceptos
- Estructura de datos: conversacion con `messages`.
- Getters `activeConversation` y `visibleMessages`.
- `*ngIf` + `*ngFor` para estados vacios y lista de mensajes.

### Validacion
Al cambiar de conversacion, cambia la lista de mensajes en el panel principal.
