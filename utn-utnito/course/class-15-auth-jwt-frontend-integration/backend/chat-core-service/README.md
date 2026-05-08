# class-15 backend/chat-core-service

NestJS backend used across all steps of class 15 frontend JWT integration.

Includes:
- `POST /auth/login`
- `GET /auth/me` (Bearer protected)
- `POST /auth/refresh-token`
- conversations and messages endpoints (Bearer protected)
- Swagger docs

## Run

```bash
npm install
npm run start:dev
```

- API base: `http://localhost:5001`
- Swagger: `http://localhost:5001/api`
