# Clase 09 - Servicios y modelos en Angular

## Espanol

### Objetivo
Mover la logica y los datos del componente a carpetas `model` y `service`, manteniendo la UI de clase 8.

### Duracion sugerida
60 minutos

### Estructura de la clase
- `c09-chat-app-start`: punto de partida principal (estado final de clase 8).
- `steps/step-1/services-concept-demo`: mini proyecto aparte para explicar servicio frontend con backend mock.
- `steps/step-2`: crear carpeta `core/model` e importar tipos en chat.
- `steps/step-3`: agregar `MockBackendService` en proyecto principal.
- `steps/step-4`: agregar `AuthService` y conectar login.
- `steps/step-5`: consumir `AuthService` en chat.
- `steps/step-6`: agregar `ChatService` y mover estado/acciones de chat.
- `steps/step-7`: snapshot final.
- `c09-chat-app-end`: resultado final esperado.
- `slides/outline.md`: guia para presentacion.
- `checklist.md`: validacion final.
- `troubleshooting.md`: errores comunes.

### Flujo de practica
1. Demo conceptual:
   - `cd programacion_III_UTN_private/utn-utnito/course/class-09-angular-services-models/steps/step-1/services-concept-demo`
   - `npm install`
   - `npm run start`
2. Proyecto principal:
   - `cd ../../../c09-chat-app-start`
   - `npm install`
   - `npm run start`
3. Aplicar cambios step por step copiando archivos desde `../steps`.

### Entregable
- Modelos tipados en `core/model`.
- Servicio `MockBackendService` para simular backend local.
- Servicio `AuthService` para sesion local de usuario.
- Servicio `ChatService` para estado y acciones del chat.
- Componentes `LoginComponent` y `ChatComponent` mas livianos.

---

## English

### Objective
Move data and behavior from the component into `model` and `service` folders while keeping class 8 UI behavior.

### Suggested Duration
60 minutes

### Class Structure
- `c09-chat-app-start`: main starting point (class 8 final state).
- `steps/step-1/services-concept-demo`: separate mini project to explain frontend service with mock backend.
- `steps/step-2`: create `core/model` and import types in chat.
- `steps/step-3`: add `MockBackendService` in main project.
- `steps/step-4`: add `AuthService` and connect login.
- `steps/step-5`: consume `AuthService` in chat.
- `steps/step-6`: add `ChatService` and move chat state/actions.
- `steps/step-7`: final snapshot.
- `c09-chat-app-end`: expected final result.
- `slides/outline.md`: presentation guide.
- `checklist.md`: final validation.
- `troubleshooting.md`: common issues.

### Step Copy Rule
- Follow each step README and copy only listed files into `c09-chat-app-start/src/app/...`.
- Step 7 is a full snapshot from `c09-chat-app-end/src`.
