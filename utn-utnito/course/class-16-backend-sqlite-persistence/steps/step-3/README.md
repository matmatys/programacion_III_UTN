# Step 3 - ConversationService to repository

## Espanol

### Objetivo
Migrar `ConversationService` de arrays en memoria a `Repository<ConversationEntity>`.

### Archivos a copiar
Copiar sobre: `course/class-16-backend-sqlite-persistence/backend/chat-core-service-start`
Origen: `course/class-16-backend-sqlite-persistence/steps/step-3/backend`
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
- `list/get/create/rename/activate/archive` ahora usan SQLite.
- Se mantiene el mismo contrato HTTP en controllers.
- `MessageService` aun no persiste mensajes (se migra en Step 4).

En macOS usar copia por terminal para evitar mover archivos del step por error:

```bash
cd course/class-16-backend-sqlite-persistence
rsync -a --delete steps/step-3/backend/ backend/chat-core-service-start/
```

### Concepto clave
- Cambiamos implementacion interna del service, no la API externa.
