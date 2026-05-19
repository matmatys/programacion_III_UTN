# class-16 backend/chat-core-service-start

Start backend for class 16.

This is the class 15 end backend state:
- JWT login + refresh + me,
- Bearer-protected conversations/messages,
- data still in memory (no SQLite yet).

In class 16 steps we migrate persistence to SQLite.

## Run

```bash
npm install
npm run start:dev
```

- API base: `http://localhost:5001`
- Swagger: `http://localhost:5001/api`
