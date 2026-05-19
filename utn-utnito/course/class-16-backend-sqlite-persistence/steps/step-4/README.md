# Step 4 - MessageService to repository (final)

## Espanol

### Objetivo
Cerrar la migracion de persistencia moviendo `MessageService` a `Repository<MessageEntity>`.

### Archivos a copiar
Copiar sobre: `course/class-16-backend-sqlite-persistence/backend/chat-core-service-start`
Origen: `course/class-16-backend-sqlite-persistence/steps/step-4/backend`
Copiar el contenido completo de `backend/` de este step:
- `.env.example`
- `.vscode/launch.json`
- `README.md`
- `nest-cli.json`
- `tsconfig.json`
- `tsconfig.build.json`
- `package.json`
- `database/`
- `src/`

### Que cambia
- `listMessages`, `createMessage`, `deleteMessage` persisten en SQLite.
- El flujo completo (conversaciones + mensajes) queda persistido.

En macOS usar copia por terminal para evitar mover archivos del step por error:

```bash
cd course/class-16-backend-sqlite-persistence
rsync -a --delete steps/step-4/backend/ backend/chat-core-service-start/
```

### Prueba final sugerida
1. Crear conversacion y mensajes desde frontend.
2. Reiniciar backend.
3. Volver a frontend y verificar que los datos siguen.

### Cierre
Este step coincide con `backend/chat-core-service-end`.
