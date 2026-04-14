# Troubleshooting - Clase 09

## 1) Cannot find module '../core/model/...'
Causa: rutas de import incorrectas.

Solucion:
- Desde `src/app/chat/chat.component.ts` usar `../core/...`.
- Desde `src/app/core/service/...` usar `../model/...`.

## 2) NullInjectorError for AuthService or ChatService
Causa: archivo no copiado o error de path.

Solucion:
- Confirmar que los servicios existen en `src/app/core/service`.
- Confirmar que tienen `@Injectable({ providedIn: 'root' })`.

## 3) Login siempre falla
Causa: credenciales invalidas para el mock.

Solucion:
- Probar con:
  - username: `carlos.gardel`
  - password: `123456`

## 4) Chat redirige a /login
Causa: no hay sesion en `AuthService`.

Solucion:
- Hacer login nuevamente.
- Revisar que `authService.login(...)` se ejecute antes del navigate a `/chat`.

## 5) Chat no cambia al archivar o filtrar
Causa: seleccion activa queda fuera del conjunto visible.

Solucion:
- Revisar la logica de re-seleccion en `ChatService` al archivar y filtrar.
