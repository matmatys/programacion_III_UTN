# Slide Outline - Clase 09 (Practica)

## Slide 1 - Titulo
- Programacion III - Practica 09
- Servicios y modelos en Angular

## Slide 2 - Objetivo de hoy
- Separar responsabilidades de frontend.
- Pasar de estado en componente a estado en servicios.

## Slide 3 - Step 1 (demo conceptual)
- Misma idea de estado local de clase 8.
- Ahora con `MockBackendService`.

## Slide 4 - Step 2
- Crear carpeta `core/model`.
- Tipar `Conversation`, `Message`, `AuthUser`.

## Slide 5 - Step 3
- `MockBackendService` en el proyecto principal.
- Chat usa servicio para leer y mutar datos.

## Slide 6 - Step 4
- `AuthService` en login.
- Sesion local de usuario.

## Slide 7 - Step 5
- Chat consume `AuthService`.
- Display name e iniciales desde servicio.

## Slide 8 - Step 6
- `ChatService` centraliza estado y acciones.
- Componente mas liviano.

## Slide 9 - Step 7
- Snapshot final.
- Checklist de cierre.

## Slide 10 - Proxima clase
- Asincronia en Angular.
- Mismo esquema de servicios, ahora con llamadas async.
