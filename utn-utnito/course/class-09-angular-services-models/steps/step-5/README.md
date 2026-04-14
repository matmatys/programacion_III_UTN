# Step 5 - Consumir AuthService en chat

## Espanol

### Objetivo
Leer usuario actual desde `AuthService` en chat, proteger la ruta por sesion local y mantener `ChatService` como capa de reglas del chat.

### Archivos a copiar
- carpeta completa `src/app/chat/`
- carpeta completa `src/app/login/`

### Conceptos
- Estado compartido entre login y chat.
- Componente sin hardcode de usuario.
- Reutilizacion de servicios (`AuthService` + `ChatService`) en el mismo componente.
