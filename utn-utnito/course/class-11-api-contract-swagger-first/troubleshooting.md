# Troubleshooting - Clase 11

## 1) Swagger no abre en `/api`
Causa: backend no esta corriendo o puerto incorrecto.

Solucion:
- Ejecutar `npm run start:dev`.
- Revisar puertos:
  - demo step 1: `5001`
  - proyecto principal: `5001`

## 2) Error `Cannot find module '@nestjs/swagger'`
Causa: faltan dependencias.

Solucion:
- Ejecutar `npm install` en el proyecto correspondiente.

## 3) Endpoint aparece en codigo pero no en Swagger
Causa: controller no agregado en `app.module.ts`.

Solucion:
- Revisar `controllers: [...]` en `src/app.module.ts`.

## 4) Error en imports al aplicar steps
Causa: faltan archivos de step anterior.

Solucion:
- Aplicar steps en orden (`2 -> 3 -> 4 -> 5 -> 6`).
- Copiar exactamente los archivos listados en cada README.

## 5) Body llega vacio en POST
Causa: request enviado sin `Content-Type: application/json`.

Solucion:
- Probar desde Swagger UI o enviar JSON valido desde cliente HTTP.
