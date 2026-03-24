# Referencia rapida - Componentes Angular (Clase 05)

## 0) Curiosidad: crear una app Angular desde cero (no usado en este curso)

En esta cursada no vamos a generar el proyecto con este comando porque partimos de un starter ya preparado.

```bash
npx @angular/cli@17 new mi-chat-app --style=css --skip-tests --skip-git
```

## 1) Componente basico

```ts
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {}
```

## 2) Declarar en AppModule

```ts
@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 3) Mostrar componente en template

```html
<app-login></app-login>
```

## 4) Enviar evento hijo -> padre

```ts
@Output() loginRequested = new EventEmitter<string>();
```

```html
<app-login (loginRequested)="onLoginRequested($event)"></app-login>
```

## 5) Enviar dato padre -> hijo

```ts
@Input() displayName = 'Carlos Gardel';
```

```html
<app-chat [displayName]="displayName"></app-chat>
```
