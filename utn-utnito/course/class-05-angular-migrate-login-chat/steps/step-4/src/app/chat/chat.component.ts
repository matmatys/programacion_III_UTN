import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false
})
export class ChatComponent {
  @Input() displayName = 'Carlos Gardel';
  @Output() logoutRequested = new EventEmitter<void>();

  onLogoutClick(): void {
    this.logoutRequested.emit();
  }
}
