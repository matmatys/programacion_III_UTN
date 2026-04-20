# Step 1 - HTTP Methods + Request/Response Demo

## Run
1. `npm install`
2. `npm run start:dev`
3. Open Swagger at `http://localhost:5001/api`

## Run from VS Code (Play/F5)
- Open this folder in VS Code.
- Run configuration: `Launch Nest Application`.
- This uses `npm run start:debug` (same style as full project backend).

## Purpose
This demo is used only for concept explanation:
- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Request models in `src/demo-messages/request`
- Response wrapper in `src/basic/response-object.model.ts`
- Basic HTTP exceptions (`BadRequestException`, `NotFoundException`)
- Request body
- Response body
- Contract visibility in Swagger

## Minimal NestJS Intro (class 11 level)
- `@Controller(...)` defines the resource endpoints.
- `@Get/@Post/@Patch/@Put/@Delete` define operations.
- `@Body()` receives input payload.
- `ResponseObject<T>` returns a consistent API output.

Note: class 12 is where Nest architecture is covered in more detail.

## PATCH vs PUT in this demo
- Message has two editable fields: `content` and `name`.
- `PATCH` updates only sent fields (partial update).
- `PUT` replaces the full resource (`content` + `name` required).

## Quick HTTP status reminder
- `200`: success
- `400`: invalid request
- `500`: unexpected server error
