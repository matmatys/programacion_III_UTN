# Clase 13 - Troubleshooting

## 1. `CORS error` en frontend
Verificar que el backend de clase 13 este corriendo y con `app.enableCors(...)`.

## 2. `404` en login o conversaciones
Verificar que el frontend apunte a `http://localhost:5001` en `environment.ts`.

## 3. `Could not find builder` en Angular build
Falta instalar dependencias en el frontend (`npm install`).

## 4. Backend no compila (`Cannot find module '@nestjs/*'`)
Faltan dependencias en backend (`npm install`).

## 5. Login no navega
Revisar credenciales mock del backend:
- username: `carlos.gardel`
- password: `123456`
