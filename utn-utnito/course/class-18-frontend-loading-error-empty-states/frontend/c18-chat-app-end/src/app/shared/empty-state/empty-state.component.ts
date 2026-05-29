import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.css'],
  standalone: false,
})
export class EmptyStateComponent {
  // Short message shown to the user when there is nothing to display.
  @Input() message = 'No hay datos para mostrar.';

  // Optional call-to-action label. When null, the action button is hidden.
  @Input() actionLabel: string | null = null;

  // Emitted when the user clicks the call-to-action button.
  @Output() readonly action = new EventEmitter<void>();
}
