# Step 4 - Conectar login y chat

## Espanol

### Objetivo
Conectar ambos componentes con estado local en `AppComponent`.

### Archivos a copiar
- `src/app/app.module.ts`
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.css`
- `src/app/login/login.component.ts`
- `src/app/login/login.component.html`
- `src/app/login/login.component.css`
- `src/app/chat/chat.component.ts`
- `src/app/chat/chat.component.html`
- `src/app/chat/chat.component.css`

Nota:
- Este step esta pensado como snapshot autocontenido del estado de la clase.
- Si faltan estilos, copiar tambien estos archivos CSS del step.

### Conceptos
- Estado local (`currentView`)
- Eventos de componente (`@Output`)
- Datos hacia componente hijo (`@Input`)

### Validacion
- Login muestra chat al enviar formulario.
- Chat vuelve a login con `Log out`.

---

## English

### Objective
Connect both components using local state in `AppComponent`.
