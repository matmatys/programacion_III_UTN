# Slides Outline - Clase 18 (Frontend: loading, error, vacio)

1. Objetivo de la clase
- Salir del happy path: cubrir loading, empty y error en una vista que pide datos.

2. Modelo mental
- Una vista asincronica tiene 4 estados: loading, success, empty, error.
- Si solo manejamos success, los otros tres son "pantalla en blanco".

3. Step 1 - Loading
- Flag `loadingConversations` en `ChatService` (set en `true` al inicio, `false` en `finalize`).
- `SkeletonListComponent` (5 barras grises con shimmer).
- Template: `<app-skeleton-list *ngIf="isLoadingConversations">` + `<ng-container *ngIf="!isLoadingConversations">` con la lista.

4. Step 2 - Empty
- `EmptyStateComponent` reutilizable con `message`, `actionLabel`, `(action)`.
- Diferenciar "vacio inicial" (no hay conversaciones) de "vacio por filtro" (filtro sin matches).
- Template: `<app-empty-state *ngIf="visibleConversations.length === 0">` adentro del `<ng-container *ngIf="!isLoadingConversations">`.

5. Step 3 - Error
- Flag `loadConversationsError` en `ChatService`, capturado con `tap({ error })`.
- `ErrorStateComponent` reutilizable con `message`, `(retry)`.
- Metodo `retryLoadConversations()` en el componente.
- Template: `<app-error-state *ngIf="loadConversationsError">` PRIMERO en el bloque, todo lo demas dentro de `<ng-container *ngIf="!loadConversationsError">`.

6. Demo
- Loading: `delay(5000)` artificial en el service hace que el skeleton se vea solo al recargar.
- Empty: borrar la DB, login con DB vacia.
- Error: bajar el backend, recargar el chat, ver el error, levantar el backend, click "Reintentar".

7. Cierre
- Los 4 estados ahora son explicitos en el template.
- El patron (cadena de `*ngIf` con `<ng-container>` + componentes UI reutilizables) es trasladable a cualquier vista que cargue datos.
- Los componentes `skeleton-list`, `empty-state`, `error-state` quedan disponibles para reutilizar en otras pantallas.
