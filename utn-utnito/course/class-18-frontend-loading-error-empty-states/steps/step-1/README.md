# Step 1 - Loading state con skeleton

## Espanol

### Objetivo
Reemplazar la pantalla en blanco que aparece mientras se cargan las conversaciones por un `SkeletonListComponent` que comunica "algo esta pasando".

### Pre-requisito
Backend de esta clase levantado en `http://localhost:5001`.

### Archivos a copiar
Copiar sobre: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (carpeta completa de este step)

Nota:
- Este step es acumulativo y trae `src/app` completo para evitar borrados de carpetas al copiar en macOS.

### Cambios clave
- `src/app/shared/skeleton-list/`: componente nuevo que renderiza 5 barras grises animadas.
- `src/app/core/service/chat.service.ts`: 
  - nuevo flag privado `loadingConversations`,
  - getter `isLoadingConversations()`,
  - `loadConversations()` ahora setea el flag en `true` al inicio y usa `finalize` para volverlo a `false`.
- `src/app/chat/chat.component.ts`: getter `isLoadingConversations` que delega al service.
- `src/app/chat/chat.component.html`: la lista de conversaciones queda envuelta. Aparece `<app-skeleton-list *ngIf="isLoadingConversations">` cuando esta cargando, y un `<ng-container *ngIf="!isLoadingConversations">` con la lista cuando no.
- `src/app/app.module.ts`: declaracion del `SkeletonListComponent`.

### Flujo para probar
1. Login con `carlos.gardel` / `123456`.
2. Recargar `/chat`.
3. Confirmar que aparece el skeleton (5 barras grises con shimmer) por 5 segundos antes de que aparezca la lista.

> Nota didactica: `loadConversations()` incluye un `delay(5000)` artificial para que el skeleton sea visible en clase (sin necesidad de throttling). En codigo real esa linea se borra y el skeleton aparece solo cuando la red tarda.

### Conceptos
- Un componente UI reutilizable no necesita logica: solo template + estilo.
- `finalize` se ejecuta sin importar si el observable termina por `next` o por `error`: es el lugar correcto para apagar flags de loading.
- El template no toca `process.env`, `if`s anidados ni booleanos auxiliares: el flag esta en el service y se consume con un solo getter.

---

## English

### Goal
Replace the blank screen shown while conversations load with a `SkeletonListComponent` that communicates "something is happening".

### Pre-requisite
Backend of this class running at `http://localhost:5001`.

### Files to copy
Copy over: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-start`

- `src/app` (full folder from this step)

Note:
- Each step is accumulative and ships the full `src/app` folder to avoid macOS folder-delete-on-copy issues.

### Key changes
- `src/app/shared/skeleton-list/`: new component rendering 5 animated gray bars.
- `src/app/core/service/chat.service.ts`:
  - new private flag `loadingConversations`,
  - getter `isLoadingConversations()`,
  - `loadConversations()` now sets the flag to `true` upfront and uses `finalize` to set it back to `false`.
- `src/app/chat/chat.component.ts`: `isLoadingConversations` getter that delegates to the service.
- `src/app/chat/chat.component.html`: the conversations list is wrapped. `<app-skeleton-list *ngIf="isLoadingConversations">` appears while loading, and an `<ng-container *ngIf="!isLoadingConversations">` holds the list otherwise.
- `src/app/app.module.ts`: declares `SkeletonListComponent`.

### How to test
1. Log in with `carlos.gardel` / `123456`.
2. Reload `/chat`.
3. Confirm the skeleton (5 shimmering gray bars) is visible for 5 seconds before the list appears.

> Teaching note: `loadConversations()` includes an artificial `delay(5000)` so the skeleton is visible during class (no throttling needed). In real code that line is removed and the skeleton only appears when the network is actually slow.

### Concepts
- A reusable UI component doesn't need logic: just template + styles.
- `finalize` runs regardless of whether the observable completes via `next` or `error`: the right place to turn off loading flags.
- The template doesn't touch `process.env`, nested `if`s, or helper booleans: the flag lives in the service and is consumed via a single getter.
