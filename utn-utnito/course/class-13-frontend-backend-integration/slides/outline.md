# Clase 13 - Integracion frontend + backend

## 1. Objetivo
- Pasar de mock local a backend real (mock en memoria)
- Mantener arquitectura simple y clara

## 2. Arquitectura frontend
- `core/basic` para contratos de respuesta
- `core/service` para llamadas API y estado de UI

## 3. Arquitectura backend
- Controller pasamanos
- Service con logica
- ResponseBuilder en controladores

## 4. Flujo de integracion
- Login (`POST /auth/login`)
- Conversaciones (`GET /conversations`)
- Mensajes (`GET/POST /conversations/:id/messages`)
- Acciones (`POST /conversations`, `PATCH activate/archive`)

## 5. Cierre
- Front y back conectados de punta a punta
- Base lista para JWT y robustez en clases siguientes
