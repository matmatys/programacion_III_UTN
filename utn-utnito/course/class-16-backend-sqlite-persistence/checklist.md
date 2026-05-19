# Checklist - Clase 16 (Persistencia SQLite)

## Infraestructura
- [ ] `@nestjs/typeorm`, `typeorm` y `sqlite3` instalados.
- [ ] `DatabaseModule` configurado con `DB_TYPE=sqlite`.
- [ ] Archivo DB creado en `backend/chat-core-service-start/database`.

## Dominio
- [ ] `ConversationEntity` registrada en `ConversationModule`.
- [ ] `MessageEntity` registrada en `MessageModule`.
- [ ] Ambas extienden `AbstractBasicChatEntity`.

## Servicios
- [ ] `ConversationService` usa `Repository<ConversationEntity>`.
- [ ] `MessageService` usa `Repository<MessageEntity>`.
- [ ] Controller sigue como pasamanos (logica en services).

## Pruebas funcionales
- [ ] Crear conversacion desde frontend.
- [ ] Enviar mensaje y recibir mock assistant reply.
- [ ] Reiniciar backend y verificar que datos persisten.
