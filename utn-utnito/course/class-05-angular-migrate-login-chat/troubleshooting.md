# Troubleshooting - Clase 05

## Espanol

### 1) "No compila componente"
- Verificar que el componente este declarado en `app.module.ts`.
- Verificar rutas de `templateUrl` y `styleUrls`.

### 2) "No aparecen styles"
- Verificar que el `.css` del componente este en `styleUrls`.
- Verificar que no haya errores de llaves o selectores.

### 3) "No cambia de login a chat"
- Verificar `currentView` en `AppComponent`.
- Verificar `(loginRequested)` en `app.component.html`.

### 4) "No vuelve con Log out"
- Verificar `(logoutRequested)` en `app.component.html`.
- Verificar `onLogoutClick()` en `ChatComponent`.

### 5) "No llega el nombre al chat"
- Verificar `@Input() displayName` en `ChatComponent`.
- Verificar `[displayName]="displayName"` en `AppComponent`.

---

## English

### 1) "Component does not compile"
- Check component declaration in `app.module.ts`.
- Check `templateUrl` and `styleUrls` paths.

### 2) "Styles are not applied"
- Check component `.css` is included in `styleUrls`.
- Check CSS syntax errors.

### 3) "Login does not switch to chat"
- Check `currentView` in `AppComponent`.
- Check `(loginRequested)` binding in `app.component.html`.

### 4) "Log out does not return to login"
- Check `(logoutRequested)` binding in `app.component.html`.
- Check `onLogoutClick()` in `ChatComponent`.

### 5) "Username is not shown in chat"
- Check `@Input() displayName` in `ChatComponent`.
- Check `[displayName]="displayName"` binding in `AppComponent`.
