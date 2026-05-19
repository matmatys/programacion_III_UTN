# Slides Outline - Clase 16 (Backend SQLite Persistence)

1. Objetivo de la clase
- Pasar de memoria a persistencia real sin romper frontend.

2. Contexto de partida
- Base: clase 15 end.
- JWT ya funcionando.
- Falta persistir conversaciones y mensajes.

3. Step 1 - Infra DB
- `DatabaseModule`.
- `.env` con `DB_TYPE` y `DB_DATABASE`.
- TypeORM + SQLite.

4. Step 2 - Entidades
- `ConversationEntity` y `MessageEntity`.
- `AbstractBasicChatEntity`.
- `TypeOrmModule.forFeature(...)` en modulos.

5. Step 3 - Persistencia de conversaciones
- `ConversationService` migra de arrays a repository.
- Controllers quedan pasamanos.

6. Step 4 - Persistencia de mensajes
- `MessageService` migra a repository.
- Flujo completo persistido: create/list/delete mensajes.

7. Demo final
- Crear conversacion.
- Enviar mensaje.
- Reiniciar backend y validar persistencia.

8. Cierre
- Mismo contrato API, distinta implementacion interna.
- Paso clave antes de escalar backend real.
