# Checklist - Clase 09

## Verificacion funcional
- [ ] App levanta en `http://localhost:5300`.
- [ ] Login valida campos y autentica con `AuthService`.
- [ ] Chat muestra nombre e iniciales desde `AuthService`.
- [ ] Sidebar renderiza conversaciones desde `ChatService`.
- [ ] New chat crea conversacion por servicio.
- [ ] Send agrega mensajes por servicio.
- [ ] Archive oculta conversaciones activas por servicio.
- [ ] Filtro por titulo sigue funcionando.

## Verificacion tecnica
- [ ] Existen modelos en `src/app/core/model`.
- [ ] Existen servicios en `src/app/core/service`.
- [ ] `LoginComponent` no contiene logica de autenticacion hardcodeada.
- [ ] `ChatComponent` no contiene estado completo del dominio.
- [ ] El estado principal del chat queda en `ChatService`.
