# Step 1 - Demo conceptual HTTP + request/response

## Espanol

### Objetivo
Explicar de forma aislada que es un endpoint, que es request/response y como cambia el contrato segun el metodo HTTP.

### Proyecto del demo
- `steps/step-1/http-methods-swagger-demo`

### Ejecutar demo
1. `cd steps/step-1/http-methods-swagger-demo`
2. `npm install`
3. `npm run start:dev`
4. Abrir Swagger en `http://localhost:5001/api`

### Que estamos introduciendo de NestJS
- `Controller`: define endpoints.
- Decoradores HTTP (`@Get`, `@Post`, `@Patch`, `@Put`, `@Delete`): definen operaciones.
- `@Body()`: request body de entrada.
- `ResponseObject<T>`: response body de salida.

Nota: Nest se ve en detalle en clase 12. En este step lo usamos solo para visualizar el contrato en Swagger.

### Conceptos
- `GET` lista recursos.
- `POST` crea recursos.
- `PATCH` actualiza parcialmente recursos.
- `PUT` reemplaza recursos completos.
- `DELETE` elimina recursos.
- `request` y `model` en carpetas separadas.
- `ResponseObject` para respuesta consistente.
- Excepciones HTTP simples (`BadRequestException`, `NotFoundException`).
- Swagger como visualizacion del contrato.

### Diferencia visible entre PATCH y PUT en este demo
- El recurso tiene dos campos editables: `content` y `name`.
- `PATCH` permite enviar solo un campo.
- `PUT` requiere enviar el objeto completo (`content` + `name`).

### Errores HTTP basicos
- `200 OK`: request correcta.
- `400 Bad Request`: request invalida.
- `500 Internal Server Error`: error interno inesperado.

### Nota final
Este step es conceptual y separado del proyecto principal.
