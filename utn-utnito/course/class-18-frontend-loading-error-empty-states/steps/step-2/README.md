# Step 2 - Empty state con CTA

## Espanol

### Objetivo
Cuando la lista de conversaciones esta vacia (un usuario nuevo, o el usuario archivo todo), mostrar un `EmptyStateComponent` con mensaje claro y un boton para crear la primera conversacion.

Tambien se diferencia el caso "vacio inicial" del caso "vacio por filtro": el `<p class="empty-list">` original aparecia siempre que no habia resultados, lo cual se confundia con "no hay conversaciones". Ahora solo aparece si el filtro esta activo.

### Pre-requisito
Backend de esta clase levantado en `http://localhost:5001`. Haber aplicado step-1.

### Archivos a copiar
Copiar sobre: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (carpeta completa de este step)

Nota:
- Este step es acumulativo y trae `src/app` completo (incluye lo de step-1).

### Cambios clave
- `src/app/shared/empty-state/`: componente nuevo con `@Input() message`, `@Input() actionLabel` y `@Output() action`.
- `src/app/chat/chat.component.ts`: getter `visibleConversations` que delega al service (`getVisibleConversations()`).
- `src/app/chat/chat.component.html`:
  - dentro del `<ng-container *ngIf="!isLoadingConversations">`, nuevo `<app-empty-state *ngIf="visibleConversations.length === 0">` y un `<ng-container *ngIf="visibleConversations.length > 0">` con la lista,
  - el `<p class="empty-list">` ahora tiene la condicion `*ngIf="!filteredConversations.length && conversationFilter"` para diferenciarlo del vacio inicial.
- `src/app/app.module.ts`: declaracion del `EmptyStateComponent`.

### Flujo para probar
1. Detener el backend.
2. Borrar `backend/chat-core-service/database/class18-chat.db` (si existe).
3. Levantar el backend nuevamente.
4. Login con `carlos.gardel` / `123456`.
5. Confirmar que aparece el empty state con "Todavia no tenes conversaciones. Empeza la primera." y el boton "Crear conversacion".
6. Click en el boton: se crea una conversacion y la vista pasa al estado "lista".
7. Probar tambien el filtro: escribir en el input algo que no matchee. Tiene que aparecer "No chats match" (vacio por filtro), distinto del empty initial.

### Conceptos
- "Vacio" no es un estado unico: hay vacio inicial (oportunidad de onboarding), vacio por filtro (relajar el filtro) y vacio por eliminacion. Cada uno necesita un mensaje y una accion distintas.
- Un componente generico (`EmptyStateComponent`) acepta el mensaje y la accion como inputs/outputs: la vista que lo usa decide que decir y que hacer.
- `*ngIf` con `<ng-container>` anidados deja explicita la cadena de estados y cada rama queda legible.

---

## English

### Goal
When the conversation list is empty (new user, or the user archived everything), show an `EmptyStateComponent` with a clear message and a button to create the first conversation.

This step also separates "initial empty" from "empty by filter": the original `<p class="empty-list">` fired whenever there were no results, conflating both cases. Now it only fires when a filter is active.

### Pre-requisite
Backend of this class running at `http://localhost:5001`. Step-1 already applied.

### Files to copy
Copy over: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (full folder from this step)

Note:
- Each step is accumulative and ships the full `src/app` folder (includes step-1's changes).

### Key changes
- `src/app/shared/empty-state/`: new component with `@Input() message`, `@Input() actionLabel` and `@Output() action`.
- `src/app/chat/chat.component.ts`: `visibleConversations` getter delegating to the service (`getVisibleConversations()`).
- `src/app/chat/chat.component.html`:
  - inside the `<ng-container *ngIf="!isLoadingConversations">`, a new `<app-empty-state *ngIf="visibleConversations.length === 0">` and a `<ng-container *ngIf="visibleConversations.length > 0">` holding the list,
  - the `<p class="empty-list">` now uses `*ngIf="!filteredConversations.length && conversationFilter"` to distinguish it from the initial empty state.
- `src/app/app.module.ts`: declares `EmptyStateComponent`.

### How to test
1. Stop the backend.
2. Delete `backend/chat-core-service/database/class18-chat.db` (if it exists).
3. Start the backend again.
4. Log in with `carlos.gardel` / `123456`.
5. Confirm the empty state appears with "Todavia no tenes conversaciones. Empeza la primera." and the "Crear conversacion" button.
6. Click the button: a conversation is created and the view switches to the list state.
7. Also test the filter: type something that doesn't match in the filter input. "No chats match" must appear (empty-by-filter), different from initial empty.

### Concepts
- "Empty" is not a single state: there's initial empty (onboarding opportunity), empty-by-filter (relax the filter) and empty-by-deletion. Each needs its own message and action.
- A generic component (`EmptyStateComponent`) accepts the message and action as inputs/outputs: the consuming view decides what to say and what to do.
- `*ngIf` with nested `<ng-container>` makes the state chain explicit and keeps each branch readable.
