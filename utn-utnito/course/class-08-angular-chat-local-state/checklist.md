# Checklist - Clase 08

## Verificacion funcional
- [ ] App levanta en `http://localhost:5300`.
- [ ] Sidebar renderiza conversaciones con `*ngFor`.
- [ ] Se puede seleccionar conversacion activa.
- [ ] Mensajes cambian segun conversacion seleccionada.
- [ ] Si la conversacion no tiene mensajes, aparece estado vacio.
- [ ] Boton `+ New chat` crea una nueva conversacion activa.
- [ ] Composer envia mensaje local y limpia input.
- [ ] Se agrega respuesta mock local del asistente.
- [ ] Boton `🗑` archiva conversaciones y las oculta de la lista activa.
- [ ] Filtro de chats por titulo funciona sobre conversaciones no archivadas.

## Verificacion tecnica
- [ ] Se usa `*ngFor` para listas.
- [ ] Se usa `*ngIf` para estados vacios.
- [ ] El estado vive en `ChatComponent` (sin servicios).
- [ ] No se implementa busqueda de mensajes en esta clase.
