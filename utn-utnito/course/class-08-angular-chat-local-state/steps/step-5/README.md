# Step 5 - Archive de conversaciones

## Espanol

### Objetivo
Agregar archive local de conversaciones con boton lateral `🗑` (mismo patron visual del full project).

### Archivos a copiar
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

### Conceptos
- Flag `archived` en cada conversacion.
- Estado derivado `visibleConversations` para ocultar archivadas.
- Accion de archive desde cada item de la sidebar.

### Validacion
- Click en `🗑` archiva la conversacion y desaparece de la lista activa.
- Si se archiva la conversacion activa, se selecciona automaticamente otra disponible.
