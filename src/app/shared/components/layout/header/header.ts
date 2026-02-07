import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Input() userName = 'Juan David Pérez';
  @Input() userRole = 'Estudiante';

  @Output() addClicked = new EventEmitter<void>();

  get initials(): string {
    return this.userName
      .split(' ')
      .filter((word) => word.length > 0)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join('');
  }

  onAdd(): void {
    this.addClicked.emit();
  }
}
