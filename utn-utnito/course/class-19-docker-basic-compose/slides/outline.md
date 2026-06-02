# Clase 19 - Docker basico y docker-compose

## 1. Problema
- En local cada alumno puede tener Node, npm, puertos y variables diferentes.
- Docker empaqueta runtime + app + configuracion de arranque.

## 2. Conceptos base
- Imagen
- Contenedor
- Dockerfile
- Puerto interno vs puerto publicado
- Variable de entorno
- Volumen

## 3. Step 1
- Dockerizar backend.
- `APP_PORT=3001`
- `DB_DATABASE=./database/class19-chat.db`
- Volumen para `/app/database`

## 4. Step 2
- Dockerizar frontend.
- Angular build.
- nginx runtime.
- URL de API para el navegador: `http://localhost:4012`

## 5. Step 3
- Compose stack.
- Servicios: `chat-core-service`, `chat-frontend`.
- Red: `utn-utnito-network-class-19`.
- Volumen: `utn-utnito-class-19-chat-db-data`.
- Healthchecks.
- Levantar en background con `docker compose up -d`.
- Logs desde Docker Desktop.

## 6. Cierre
- Stack reproducible.
- Base lista para sumar `chat-n8n` en la proxima iteracion.
