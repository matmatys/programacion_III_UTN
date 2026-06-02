# Class 19 workspace start

Initial workspace for class 19.

It contains:
- `backend/chat-core-service`: class 17 end backend, adapted as class 19 start.
- `frontend/chat-app`: class 16 frontend.

This start state has no Docker files yet. Apply the steps from the parent class folder to add Docker incrementally.

## Local run

Backend:
```bash
cd backend/chat-core-service
cp .env.example .env
npm install
npm run start:dev
```

Frontend:
```bash
cd frontend/chat-app
npm install
npm run start
```
