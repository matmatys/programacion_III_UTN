# Slide Outline - Clase 11 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 11
- Contrato API + Swagger-first

## Slide 2 - Objetivo de hoy
- Diseñar API antes de implementar backend real.
- Definir request/response y recursos.

## Slide 3 - Mapa de controllers de la clase
- `HealthController` (smoke check del backend).
- `DemoMessagesController` (demo de HTTP methods en Swagger).
- `AuthController` (`/auth/login`).
- `ConversationController` (`/conversations`).
- `MessageController` (`/conversations/:conversationId/messages`).
- Nota: hoy los usamos como soporte del contrato; services en detalle se ven en clase 12.

## Slide 4 - Step 1 (demo conceptual)
- HTTP methods: GET, POST, PUT, PATCH, DELETE.
- Request body y response body.
- Ver todo en Swagger.

## Slide 5 - Step 2
- Respuesta consistente (`ResponseObject`).
- Idea de contrato comun para todo endpoint.

## Slide 6 - Step 3
- Contrato auth (`/auth/login`).
- Exito y error basico.

## Slide 7 - Step 4
- Contrato conversations.
- Recursos y rutas basadas en sustantivos.

## Slide 8 - Step 5
- Contrato messages por conversacion.
- Request + response de envio de mensaje.

## Slide 9 - Step 6
- Snapshot final.
- Checklist de cierre.

## Slide 10 - Puente a clase 12
- Clase 11: definimos contrato.
- Clase 12: implementamos controllers + services mock.
