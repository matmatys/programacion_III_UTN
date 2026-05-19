# Troubleshooting - Clase 16 (Persistencia SQLite)

## Error: sqlite driver not found
- Ejecutar `npm install` en `backend/chat-core-service-start`.
- Verificar que `sqlite3` este en `package.json`.

## Error de ruta de base de datos
- Revisar `.env`:
  - `DB_TYPE=sqlite`
  - `DB_DATABASE=./database/class16-chat.db`
- Verificar que exista carpeta `database`.

## Frontend no muestra conversaciones
- Confirmar backend en `http://localhost:5001`.
- Probar `GET /conversations` en Swagger.
- Si la DB esta vacia, crear una conversacion desde UI.

## Mensajes no se guardan
- Verificar que `MessageService` este en step 4 (repositorio TypeORM).
- Probar `POST /conversations/{id}/messages` en Swagger.
