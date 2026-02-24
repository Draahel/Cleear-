import { Routes } from '@angular/router';

export const privateRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../features/home/home').then( component => component.Home ),
    data: { roles: ["ADMIN", "REPORTER"] }
  }
];
