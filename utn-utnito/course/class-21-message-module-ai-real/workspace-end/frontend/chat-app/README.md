# Class 21 frontend start

Frontend start snapshot for class 21.

It starts from the class 19 end frontend and includes Docker support.

Path: `course/class-21-message-module-ai-real/workspace-start/frontend/chat-app`

## Run

```bash
npm install
npm run start
```

Open: `http://localhost:5300`

## Docker

This snapshot includes frontend Docker support.

```bash
docker build -t class21-chat-frontend ./frontend/chat-app
docker run --rm \
  --name class21-chat-frontend \
  -p 4300:80 \
  class21-chat-frontend
```

Open: `http://localhost:4300`

The Docker build reads `CORE_SERVICE_URL` from `.env.docker` and writes it into the Angular docker environment at build time.
