import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.css'],
  standalone: false,
})
export class SkeletonListComponent {
  // Number of placeholder rows to render. Defaults to 5 for a list-like layout.
  @Input() rows = 5;

  get placeholderRows(): number[] {
    return Array.from({ length: this.rows }, (_, index) => index);
  }
}
