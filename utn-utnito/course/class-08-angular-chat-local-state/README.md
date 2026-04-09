# Clase 08 - Estado local del chat (Angular)

## Espanol

### Objetivo
Construir un chat navegable con estado local en memoria: seleccion de conversaciones, mensajes por conversacion, new chat, envio local, archive y filtro simple.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c08-chat-app-start`: punto de partida (estado final de clase 7).
- `steps/step-1/state-concept-demo`: mini proyecto aparte para explicar estado + `*ngIf` + `*ngFor`.
- `steps/step-2`: seleccion de conversacion desde sidebar.
- `steps/step-3`: mensajes por conversacion + estados vacios.
- `steps/step-4`: `New chat` + envio local de mensajes.
- `steps/step-5`: archive local de conversaciones con boton `🗑`.
- `steps/step-6`: filtro simple de conversaciones no archivadas.
- `steps/step-7`: snapshot final.
- `c08-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia de presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo conceptual:
   - `cd programacion_III_UTN/utn-utnito/course/class-08-angular-chat-local-state/steps/step-1/state-concept-demo`
   - `npm install`
   - `npm run start`
2. Proyecto principal:
   - `cd ../../../c08-chat-app-start`
   - `npm install`
   - `npm run start`
3. Aplicar cambios step por step copiando archivos desde `../steps`.

### Entregable
- Sidebar con conversaciones renderizadas desde estado local.
- Conversacion activa seleccionable.
- Mensajes renderizados por conversacion.
- `New chat` y envio local de mensajes (user + mock).
- Archive local con boton `🗑`.
- Filtro simple de conversaciones por titulo.

---

## English

### Objective
Build a navigable chat UI with local in-memory state: conversation selection, per-conversation messages, new chat, local send, archive, and simple filtering.

### Suggested Duration
60 minutes

### Class Structure
- `c08-chat-app-start`: starting point (class 7 final state).
- `steps/step-1/state-concept-demo`: separate mini project to explain state + `*ngIf` + `*ngFor`.
- `steps/step-2`: sidebar conversation selection.
- `steps/step-3`: per-conversation messages + empty states.
- `steps/step-4`: `New chat` + local send.
- `steps/step-5`: local archive with `🗑` button.
- `steps/step-6`: simple non-archived conversation filter.
- `steps/step-7`: final snapshot.
- `c08-chat-app-end`: expected final result.
