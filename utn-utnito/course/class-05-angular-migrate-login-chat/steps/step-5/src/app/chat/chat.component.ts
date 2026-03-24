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

  get initials(): string {
    const parts = this.displayName.trim().split(/\s+/).slice(0, 2);

    if (!parts.length) {
      return 'UU';
    }

    return parts.map((part) => part[0]?.toUpperCase() || '').join('');
  }

  onLogoutClick(): void {
    this.logoutRequested.emit();
  }
}
