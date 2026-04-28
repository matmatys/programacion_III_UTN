# Clase 13 - Checklist

## Backend
- [ ] `backend/chat-core-service` inicia en puerto `5001`
- [ ] Swagger disponible en `http://localhost:5001/api`
- [ ] `POST /auth/login` responde session mock
- [ ] Endpoints de conversaciones y mensajes responden con `ResponseObject`

## Frontend
- [ ] Front inicia en `http://localhost:5300`
- [ ] Login funciona contra backend real
- [ ] Se listan conversaciones desde backend
- [ ] Al seleccionar conversacion se listan mensajes
- [ ] Enviar mensaje agrega user + assistant desde backend
- [ ] New chat crea una conversacion real
- [ ] Archive archiva conversacion real

## Integracion
- [ ] Backend y frontend corren en paralelo sin errores de CORS
- [ ] El flujo final (login/chat/actions) usa backend real por HTTP
