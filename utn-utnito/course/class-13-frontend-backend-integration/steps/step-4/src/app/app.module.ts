import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
