import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alert {
  id: number;
  title: string;
  subtitle: string;
  count: number;
  variant: 'critical' | 'review';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  searchQuery = '';

  alerts: Alert[] = [
    {
      id: 1,
      title: 'Criticas',
      subtitle: 'Requieren atencion inmediata',
      count: 5,
      variant: 'critical',
    },
    {
      id: 2,
      title: 'En revision',
      subtitle: 'Pendientes de respuesta',
      count: 12,
      variant: 'review',
    },
  ];

  onPreferences(): void {
    // Navigate to preferences
  }

  onAddAlert(): void {
    // Open add alert dialog
  }

  onAlertClick(alert: Alert): void {
    // Navigate to alert detail
  }
}
