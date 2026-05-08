import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', redirectTo: '/login' },
];
