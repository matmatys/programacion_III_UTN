# Step 1 - Database infrastructure (TypeORM + SQLite)

## Espanol

### Objetivo
Agregar la infraestructura de persistencia sin tocar todavia la logica de dominio:
- dependencias TypeORM/SQLite,
- `DatabaseModule`,
- variables de entorno DB.

### Archivos a copiar
Copiar sobre: `course/class-16-backend-sqlite-persistence/backend/chat-core-service-start`
Origen: `course/class-16-backend-sqlite-persistence/steps/step-1/backend`
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
- Este step es acumulativo y trae backend completo para evitar borrados en macOS al reemplazar carpetas.
- En macOS usar copia por terminal para evitar mover archivos del step por error:

```bash
cd course/class-16-backend-sqlite-persistence
rsync -a --delete steps/step-1/backend/ backend/chat-core-service-start/
```

### Probar
1. `npm install`
2. `npm run start:dev`
3. Abrir Swagger: `http://localhost:5001/api`
4. Verificar que levanta sin errores de TypeORM.

### Concepto clave
- Todavia no migramos services.
- Solo preparamos el backend para hablar con SQLite.

### Opcional: inspeccionar tablas con DBeaver
- Download: https://dbeaver.io/download/
- Abrir el archivo SQLite: `backend/chat-core-service-start/database/class16-chat.db`
