# Step 3 - Error state con retry

## Espanol

### Objetivo
Cuando la carga de conversaciones falla (backend caido, red sin conexion, 500), mostrar un `ErrorStateComponent` con mensaje humano y un boton de reintentar, en vez de dejar la sidebar en blanco.

### Pre-requisito
Backend de esta clase levantado en `http://localhost:5001`. Haber aplicado step-1 y step-2.

### Archivos a copiar
Copiar sobre: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (carpeta completa de este step)

Nota:
- Este step es acumulativo y trae `src/app` completo (incluye lo de step-1 y step-2).

### Cambios clave
- `src/app/shared/error-state/`: componente nuevo con `@Input() message`, `@Input() retryLabel` y `@Output() retry`.
- `src/app/core/service/chat.service.ts`:
  - nuevo flag privado `loadConversationsError: string | null`,
  - getter `getLoadConversationsError()`,
  - `loadConversations()` ahora resetea el error en cada intento y captura el fallo con `tap({ error })` para guardar un mensaje humano (el observable sigue propagando el error para que el subscriber pueda actuar).
- `src/app/chat/chat.component.ts`:
  - getter `loadConversationsError`,
  - metodo publico `retryLoadConversations()` que invoca el mismo flujo de carga inicial.
- `src/app/chat/chat.component.html`: `<app-error-state *ngIf="loadConversationsError">` queda al principio del bloque (los errores tapan cualquier otro estado) y todo lo demas vive dentro de `<ng-container *ngIf="!loadConversationsError">`.
- `src/app/app.module.ts`: declaracion del `ErrorStateComponent`.

### Flujo para probar
1. Levantar todo y loguear normalmente.
2. Detener el backend (`Ctrl+C` en la terminal del backend).
3. Recargar `/chat` o navegar a el desde otra ruta.
4. Confirmar que aparece el error state con "No pudimos cargar las conversaciones..." y el boton "Reintentar".
5. Levantar el backend de nuevo (`npm run start:dev`).
6. Click en "Reintentar": el skeleton aparece brevemente y luego la lista de conversaciones.

### Conceptos
- `tap({ next, error })` deja capturar el error para la UI sin alterar el contrato del observable: el error sigue propagandose al subscriber.
- El estado de error tiene prioridad sobre `loading` y `empty` en el template: si fallo, no muestres data vieja debajo.
- Mensaje de error: humano, sin jerga, sin stack trace. Ofrece una accion (reintentar) y mantiene la app navegable (el resto de la pagina sigue funcionando).
- Despues de este step, ninguna rama de la cadena de `*ngIf` queda como "pantalla en blanco" — todos los estados son explicitos.

---

## English

### Goal
When loading conversations fails (backend down, no network, 500), show an `ErrorStateComponent` with a human-friendly message and a retry button, instead of leaving the sidebar blank.

### Pre-requisite
Backend of this class running at `http://localhost:5001`. Step-1 and step-2 already applied.

### Files to copy
Copy over: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (full folder from this step)

Note:
- Each step is accumulative and ships the full `src/app` folder (includes step-1 and step-2 changes).

### Key changes
- `src/app/shared/error-state/`: new component with `@Input() message`, `@Input() retryLabel` and `@Output() retry`.
- `src/app/core/service/chat.service.ts`:
  - new private flag `loadConversationsError: string | null`,
  - getter `getLoadConversationsError()`,
  - `loadConversations()` resets the error on each attempt and captures failures via `tap({ error })` to store a human message (the observable still propagates the error so subscribers can react).
- `src/app/chat/chat.component.ts`:
  - `loadConversationsError` getter,
  - public `retryLoadConversations()` method that re-runs the initial load flow.
- `src/app/chat/chat.component.html`: `<app-error-state *ngIf="loadConversationsError">` sits at the top of the block (errors cover everything else) and everything else lives inside `<ng-container *ngIf="!loadConversationsError">`.
- `src/app/app.module.ts`: declares `ErrorStateComponent`.

### How to test
1. Bring everything up and log in normally.
2. Stop the backend (`Ctrl+C` in the backend terminal).
3. Reload `/chat` or navigate to it from another route.
4. Confirm the error state appears with "No pudimos cargar las conversaciones..." and the "Reintentar" button.
5. Start the backend again (`npm run start:dev`).
6. Click "Reintentar": the skeleton appears briefly, then the conversations list.

### Concepts
- `tap({ next, error })` lets you capture the error for the UI without changing the observable's contract: the error keeps propagating to subscribers.
- The error state takes priority over `loading` and `empty` in the template: if it failed, don't show stale data underneath.
- Error message: human-friendly, no jargon, no stack trace. Offer an action (retry) and keep the rest of the app navigable.
- After this step, no branch of the `*ngIf` chain remains a "blank screen" — every state is explicit.
