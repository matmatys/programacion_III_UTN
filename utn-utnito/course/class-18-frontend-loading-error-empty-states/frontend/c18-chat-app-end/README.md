# c18-chat-app-end

Estado final del frontend para clase 18, con los tres steps aplicados.

La lista de conversaciones del chat ahora maneja explicitamente:
- `loading`: `SkeletonListComponent` con barras animadas mientras llegan los datos.
- `empty`: `EmptyStateComponent` con mensaje + CTA cuando el usuario no tiene conversaciones (diferenciado del "vacio por filtro").
- `error`: `ErrorStateComponent` con mensaje humano + boton "Reintentar" si la API falla.

Path: `course/class-18-frontend-loading-error-empty-states/frontend/c18-chat-app-end`

## Run

```bash
npm install
npm run start
```

Open: `http://localhost:5300`
