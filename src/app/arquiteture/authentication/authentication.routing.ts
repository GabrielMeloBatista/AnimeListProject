import { AuthenticationComponent } from './authentication.component';
import { Routes } from '@angular/router';

export const AuthenticationRoutes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthenticationComponent,
    // loadChildren: () => import('./authentication.module').then(m => m.AuthenticationModule)
  },
];
