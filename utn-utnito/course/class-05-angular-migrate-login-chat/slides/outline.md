# Slide Outline - Clase 05 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 05
- Angular minimo
- Migrar login + chat shell

## Slide 2 - Objetivo de hoy
- Pasar de HTML estatico a componentes Angular.
- Mantener solo dos pantallas: login y chat.
- Entender componente como unidad de UI.

## Slide 3 - Contexto
- Ya vimos HTML, CSS y JS en navegador.
- Hoy no agregamos backend ni servicios.
- Solo organizamos UI en Angular.
- Fuente base de migracion: `template/chat-html/` (login + chat estaticos).

## Slide 4 - Estructura del proyecto Angular
- `src/app`: componentes.
- `src/assets`: recursos estaticos.
- `src/environments`: configuracion por entorno.
- `src/index.html`: pagina base.
- `src/main.ts`: punto de entrada.
- `package.json` vs `package-lock.json`.
- `BrowserModule`: modulo base para correr Angular en navegador.

## Slide 5 - Step 1
- `AppComponent` con template externo.
- Estructura minima de componente.
- Arranque de migracion de maqueta original.
- `app-root`: punto de montaje.
- `styles.css` global vs `*.component.css` local.
- `template` inline vs `templateUrl`.

## Slide 6 - Step 2
- Crear `LoginComponent`.
- Migrar HTML/CSS del login.

## Slide 7 - Step 3
- Crear `ChatComponent`.
- Migrar chat shell del proyecto.

## Slide 8 - Step 4
- Estado local en `AppComponent`.
- `@Output` para login/logout.
- `@Input` para mostrar nombre en chat.
- `EventEmitter`: canal hijo -> padre.
- `*ngIf`: alterna login/chat sin recargar pagina.

## Slide 9 - Flujo login/logout
- Login submit -> `loginRequested.emit(username)`.
- Padre recibe evento -> actualiza `displayName`.
- Padre cambia `currentView = 'chat'`.
- `*ngIf` muestra `app-chat`.
- Logout -> `logoutRequested.emit()` -> padre vuelve a `login`.

## Slide 10 - Step 5
- Cierre y limpieza final.
- Validacion de la app.
- Step 4: conexion funcional.
- Step 5: pulido final y cierre de clase.

## Slide 11 - Resultado esperado
- App Angular con dos pantallas visuales.
- Cambio login/chat funcionando.
- Estado final esperado: `c05-chat-app-end`.

## Slide 12 - Proxima clase
- Routing real (`/login` y `/chat`).
- Misma UI, mejor arquitectura de navegacion.
