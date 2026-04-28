# class-13 backend/chat-core-service

NestJS mock backend used by Class 13 frontend integration.

It keeps state in memory and exposes:
- auth login,
- conversations CRUD-like actions,
- messages list/create,
- health endpoint,
- Swagger docs.

## Run

```bash
npm install
npm run start:dev
```

- API base: `http://localhost:5001`
- Swagger: `http://localhost:5001/api`
