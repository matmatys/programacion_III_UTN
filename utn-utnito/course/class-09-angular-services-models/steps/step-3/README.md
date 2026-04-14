# Step 3 - MockBackendService en proyecto principal

## Espanol

### Prerequisito
- Este step se aplica sobre el estado del **step 2** (la carpeta `core/model` ya debe existir).

### Objetivo
Crear `MockBackendService`, sumar `ChatService` y empezar la migracion del chat a una arquitectura por servicios.

### Archivos a copiar
- carpeta completa `src/app/core/`
- carpeta completa `src/app/chat/`

### Conceptos
- `MockBackendService` como capa de datos local.
- `ChatService` como capa de reglas de negocio del chat.
- Componente como consumidor de servicios.
