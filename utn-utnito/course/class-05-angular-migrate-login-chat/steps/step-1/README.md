# Step 1 - Preparar Angular shell

## Espanol

### Intro sugerida (antes de codear)
En este primer bloque conviene hacer un recorrido rapido de la estructura del proyecto para que todos entiendan "donde vive cada cosa" en Angular.

### Organizacion base del proyecto
- `src/app`: componentes Angular (UI + logica de pantalla).
- `src/assets`: imagenes y archivos estaticos.
- `src/environments`: configuracion por entorno.
- `src/index.html`: pagina base que carga Angular.
- `src/main.ts`: punto de entrada de la aplicacion.
- `src/styles.css`: estilos globales.
- `angular.json`: configuracion de build/serve.
- `package.json`: scripts y dependencias del proyecto.
- `package-lock.json`: version exacta de dependencias instaladas (consistencia entre maquinas).

### Que vamos a hacer en esta clase
- Tomar la maqueta original (login + chat shell) que ya vimos en HTML/CSS.
- Pasarla a Angular usando componentes.
- Mantener la UI simple y enfocarnos en organizacion.

### Objetivo
Pasar `AppComponent` a template externo para dejar lista la base de migracion.

### Archivos a copiar
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.css`

### Conceptos
- Angular component
- `templateUrl` y `styleUrls`
- App shell inicial
- Migracion de maqueta estatica a componente Angular

### Validacion
1. `npm install`
2. `npm run start`
3. Validar pantalla "Class 05 - Angular migration".

---

## English

### Suggested intro (before coding)
Start with a quick folder walkthrough so students understand where each Angular piece lives.

### Project structure (quick map)
- `src/app`: Angular components (UI + screen logic).
- `src/assets`: static files.
- `src/environments`: environment configs.
- `src/index.html`: base page that hosts Angular.
- `src/main.ts`: application entry point.
- `src/styles.css`: global styles.
- `angular.json`: build/serve configuration.
- `package.json`: scripts and dependencies.
- `package-lock.json`: exact dependency versions (same install across machines).

### Objective
Move `AppComponent` to external template and prepare migration base.

### Files to copy
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.css`

### Validation
1. `npm install`
2. `npm run start`
3. Verify screen "Class 05 - Angular migration".
