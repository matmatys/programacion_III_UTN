# Clase 05 - Angular minimo: migrar login + chat shell

## Espanol

### Objetivo
Migrar la maqueta estatica (login + chat shell) a una app Angular simple usando solo dos componentes de pantalla:
- `LoginComponent`
- `ChatComponent`

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c05-chat-app-start`: punto de partida Angular.
- `template/chat-html`: maqueta estatica base (login + chat) para migrar a Angular.
- `steps/step-1`: preparar `AppComponent` con template externo.
- `steps/step-2`: crear y migrar `LoginComponent`.
- `steps/step-3`: crear y migrar `ChatComponent`.
- `steps/step-4`: conectar ambas pantallas con estado local.
- `steps/step-5`: cierre final y version limpia.
- `c05-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Clonar repositorio:
   - `git clone https://github.com/matmatys/programacion_III_UTN.git`
2. Entrar a carpeta inicial:
   - `cd programacion_III_UTN/utn-utnito/course/class-05-angular-migrate-login-chat/c05-chat-app-start`
3. Abrir en VS Code.
4. Ejecutar:
   - `npm install`
   - `npm run start`
5. Aplicar cambios step por step copiando archivos desde `../steps`.

### Entregable
- App Angular funcionando en `http://localhost:5300`
- Dos pantallas visuales migradas a Angular (`login` y `chat`)
- Cambio entre pantallas con estado local

---

## English

### Objective
Migrate static mockup (login + chat shell) into a simple Angular app using only two screen components:
- `LoginComponent`
- `ChatComponent`

### Suggested Duration
60 minutes

### Class Structure
- `c05-chat-app-start`: Angular starting point.
- `template/chat-html`: static layout baseline (login + chat) used during migration.
- `steps/step-1`: prepare `AppComponent` with external template.
- `steps/step-2`: create and migrate `LoginComponent`.
- `steps/step-3`: create and migrate `ChatComponent`.
- `steps/step-4`: connect both screens with local state.
- `steps/step-5`: final cleanup snapshot.
- `c05-chat-app-end`: expected final result.
- `slides/outline.md`: presentation guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.
