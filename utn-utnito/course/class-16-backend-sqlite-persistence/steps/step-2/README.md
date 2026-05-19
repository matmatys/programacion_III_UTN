# Step 2 - Entities and module registration

## Espanol

### Objetivo
Definir entidades y registrarlas en los modulos:
- `ConversationEntity`,
- `MessageEntity`,
- `TypeOrmModule.forFeature(...)`.

### Archivos a copiar
Copiar sobre: `course/class-16-backend-sqlite-persistence/backend/chat-core-service-start`
Origen: `course/class-16-backend-sqlite-persistence/steps/step-2/backend`
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

Nota:
- Este step mantiene la logica de negocio en memoria.
- Solo se prepara el mapeo entre dominio y tablas SQLite.
- En macOS usar copia por terminal para evitar mover archivos del step por error:

```bash
cd course/class-16-backend-sqlite-persistence
rsync -a --delete steps/step-2/backend/ backend/chat-core-service-start/
```

### Concepto clave
- Las entidades representan como se guardan los datos.
- Los modelos siguen representando como respondemos la API.
