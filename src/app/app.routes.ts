import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Sandeep Kumar — Software Engineer',
  },
  { path: '**', redirectTo: '' },
];
