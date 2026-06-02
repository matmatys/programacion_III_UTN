# Step 2 - Frontend Docker + nginx

## Espanol

### Objetivo
Dockerizar el frontend Angular con un build multi-stage: Node compila la app y nginx sirve los archivos estaticos.

### Pre-requisito
Haber aplicado step 1.

### Archivos a copiar
Copiar sobre: `course/class-19-docker-basic-compose/workspace-start`

- `workspace` completo de este step.

Comando recomendado:
```bash
cd course/class-19-docker-basic-compose
rsync -a --delete steps/step-2/workspace/ workspace-start/
```

### Cambios clave
- `frontend/chat-app/Dockerfile`: build Angular + runtime nginx.
- `frontend/chat-app/.dockerignore`: excluye artefactos locales.
- `frontend/chat-app/nginx.conf`: soporta rutas Angular con `try_files`.
- `frontend/chat-app/.env.docker`: define `CORE_SERVICE_URL=http://localhost:4012`.
- `frontend/chat-app/src/environments/environment.docker.ts`: usa placeholder `__CORE_SERVICE_URL__`.
- `frontend/chat-app/angular.json`: agrega configuracion `docker`.

### Como probar
Con el backend Docker del step 1 corriendo, abrir otra terminal en `workspace-start`:

```bash
docker build -t class19-chat-frontend ./frontend/chat-app
docker run --rm \
  --name class19-chat-frontend \
  -p 4300:80 \
  class19-chat-frontend
```

Abrir:
- Frontend: `http://localhost:4300`

### Nota didactica importante
Aunque el frontend se sirva desde un contenedor, el codigo Angular corre en el navegador.

Por eso `CORE_SERVICE_URL` apunta a:
- `http://localhost:4012`

Y no a:
- `http://chat-core-service:3001`

`chat-core-service` es un nombre valido dentro de la red Docker, pero el navegador del alumno no esta dentro de esa red.

### Conceptos
- Build multi-stage.
- nginx como servidor estatico.
- Build-time environment en Angular.
- Diferencia entre URL para navegador y DNS interno Docker.

---

## English

### Goal
Dockerize the Angular frontend with a multi-stage build: Node builds the app and nginx serves static files.

### Key idea
Angular runs in the browser, so the API URL must be `http://localhost:4012`, not the internal Docker DNS name.
