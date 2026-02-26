import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskInventory } from '@services/task-inventory';
import { Task } from '@models/task';
import { State } from '@enums/state';
import { Priority } from '@enums/priority';

type TabOption = 'general' | 'subtasks' | 'files' | 'history';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  private readonly taskInventory = inject(TaskInventory);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  task = signal<Task | null>(null);
  isLoading = signal(false);
  activeTab = signal<TabOption>('general');
  progress = signal(65); // Simulado por ahora

  // Props para template
  protected State = State;
  protected Priority = Priority;

  protected tabs: { id: TabOption; label: string; icon: string }[] = [
    { id: 'general', label: 'General', icon: 'fa-bars' },
    { id: 'subtasks', label: 'Subtareas', icon: 'fa-list-check' },
    { id: 'files', label: 'Archivos', icon: 'fa-paperclip' },
    { id: 'history', label: 'Historial', icon: 'fa-clock' }
  ];

  protected stateColors: Record<State, { bg: string; text: string }> = {
    [State.NEW]: { bg: '#fef3c7', text: '#92400e' },
    [State.OPEN]: { bg: '#e0e7ff', text: '#3730a3' },
    [State.ASSIGNED]: { bg: '#dbeafe', text: '#0c4a6e' },
    [State.IN_PROGRESS]: { bg: '#fbbf24', text: '#78350f' },
    [State.RESOLVED]: { bg: '#bbf7d0', text: '#0f5f38' },
    [State.CANCELLED]: { bg: '#fecaca', text: '#7f1d1d' }
  };

  protected priorityColors: Record<Priority, { bg: string; text: string }> = {
    [Priority.CRITICAL]: { bg: '#fecaca', text: '#7f1d1d' },
    [Priority.HIGH]: { bg: '#fed7aa', text: '#7c2d12' },
    [Priority.MEDIUM]: { bg: '#fcd34d', text: '#78350f' },
    [Priority.LOW]: { bg: '#dbeafe', text: '#0c4a6e' }
  };

  constructor() {
    // Cargar tarea cuando la ruta cambia
    this.route.params.subscribe(params => {
      const taskId = params['taskId'];
      if (taskId) {
        this.loadTask(taskId);
      }
    });
  }

  ngOnInit(): void {
    // Carga inicial ya se hace en el constructor con la suscripción a params
  }

  private loadTask(id: string): void {
    this.isLoading.set(true);
    this.taskInventory.getById(id).subscribe({
      next: (task) => {
        if (task) {
          this.task.set(task);
        } else {
          this.router.navigate(['/task-list']);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.router.navigate(['/task-list']);
        this.isLoading.set(false);
      }
    });
  }

  protected selectTab(tab: TabOption): void {
    this.activeTab.set(tab);
  }

  protected getStateLabel(state: State): string {
    const labels: Record<State, string> = {
      [State.NEW]: 'Nuevo',
      [State.OPEN]: 'Abierto',
      [State.ASSIGNED]: 'Asignado',
      [State.IN_PROGRESS]: 'En Progreso',
      [State.RESOLVED]: 'Resuelto',
      [State.CANCELLED]: 'Cancelado'
    };
    return labels[state];
  }

  protected getPriorityLabel(priority: Priority): string {
    const labels: Record<Priority, string> = {
      [Priority.CRITICAL]: 'Crítico',
      [Priority.HIGH]: 'Alto',
      [Priority.MEDIUM]: 'Medio',
      [Priority.LOW]: 'Bajo'
    };
    return labels[priority];
  }
}
