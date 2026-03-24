import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  @Output() loginRequested = new EventEmitter<string>();

  onSubmit(event: Event, username: string): void {
    event.preventDefault();
    this.loginRequested.emit(username);
  }
}
