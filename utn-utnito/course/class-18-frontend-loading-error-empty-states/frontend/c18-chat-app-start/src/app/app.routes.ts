import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Public route: login page.
  { path: 'login', component: LoginComponent },
  // Protected route: only accessible with a valid access token.
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  // Default route.
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // Fallback for unknown URLs.
  { path: '**', redirectTo: '/login' },
];
