import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false,
})
export class ChatComponent {
  readonly displayName = 'Carlos Gardel';
  readonly initials = 'CG';

  draftMessage = '';
  lastSentMessage = '';

  constructor(private readonly router: Router) {}

  onDraftInput(value: string): void {
    this.draftMessage = value;
  }

  onComposerSubmit(event: Event): void {
    event.preventDefault();

    const normalized = this.draftMessage.trim();
    if (!normalized) {
      return;
    }

    console.log('[class-7-end] message submitted:', normalized);
    this.lastSentMessage = normalized;
    this.draftMessage = '';
  }

  onLogoutClick(): void {
    this.router.navigate(['/login']);
  }
}
