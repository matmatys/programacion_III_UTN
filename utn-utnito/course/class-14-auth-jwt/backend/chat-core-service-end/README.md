# class-14 backend/chat-core-service-end

NestJS backend final state for class 14 JWT.

This backend includes:
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
