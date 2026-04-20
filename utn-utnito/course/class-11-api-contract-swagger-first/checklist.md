# Checklist - Clase 11

## Verificacion funcional
- [ ] Swagger del demo conceptual levanta en `http://localhost:5001/api`.
- [ ] Swagger del proyecto principal levanta en `http://localhost:5001/api`.
- [ ] Endpoint `GET /health` responde OK.
- [ ] Endpoint `POST /auth/login` acepta body de login y responde contrato.
- [ ] Endpoint `GET /conversations` devuelve lista de conversaciones.
- [ ] Endpoint `POST /conversations/:conversationId/messages` devuelve mensaje usuario + reply mock.
- [ ] Existe ejemplo simple de respuesta de error (`success: false`).

## Verificacion tecnica
- [ ] Hay carpetas de modelos/request por modulo (`auth`, `conversation`, `message`).
- [ ] Existe wrapper de respuesta (`ResponseObject`, `ResponseMessage`).
- [ ] `app.module.ts` registra controllers de health/auth/conversations/messages.
- [ ] La clase mantiene foco de contrato, sin arquitectura service/repository aun.
