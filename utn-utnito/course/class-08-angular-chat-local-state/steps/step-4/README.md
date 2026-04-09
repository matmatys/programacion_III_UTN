# Step 4 - New chat + envio local de mensajes

## Espanol

### Objetivo
Activar el boton `New chat` y conectar el submit del composer para enviar mensajes en memoria.

### Archivos a copiar
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`

### Conceptos
- Creacion local de conversaciones (`createNewConversation`).
- Submit del composer para mutar mensajes en memoria.
- Reply mock local para cerrar el flujo conversacional.

### Validacion
- Click en `+ New chat` crea una conversacion nueva y la selecciona.
- Al enviar, aparecen dos mensajes nuevos (user + assistant mock).
