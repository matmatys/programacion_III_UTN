# Class 19 frontend start

Frontend snapshot for class 19 step 3.

It starts from the class 16 frontend and includes Docker support.

Path: `course/class-19-docker-basic-compose/workspace-start/frontend/chat-app`

## Run

```bash
npm install
npm run start
```

Open: `http://localhost:5300`

## Docker

This snapshot includes frontend Docker support.

```bash
docker build -t class19-chat-frontend ./frontend/chat-app
docker run --rm \
  --name class19-chat-frontend \
  -p 4300:80 \
  class19-chat-frontend
```

Open: `http://localhost:4300`

The Docker build reads `CORE_SERVICE_URL` from `.env.docker` and writes it into the Angular docker environment at build time.
