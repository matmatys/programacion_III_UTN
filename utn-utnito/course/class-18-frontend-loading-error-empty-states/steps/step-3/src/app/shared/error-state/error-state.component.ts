import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.css'],
  standalone: false,
})
export class ErrorStateComponent {
  // Human-readable explanation of what failed (avoid jargon and stack traces).
  @Input() message = 'Algo salió mal.';

  // Optional label for the retry button. When null, the button is hidden.
  @Input() retryLabel: string | null = 'Reintentar';

  // Emitted when the user clicks the retry button.
  @Output() readonly retry = new EventEmitter<void>();
}
