import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { StateResolve } from '../core/component/staterasolve';

export const SECURE_ROUTES: Routes = [
  {
    path: "home",
    canActivate: [AuthenticationGuard],
    children: [
      { path: "", component: HomeComponent }
    ],
    resolve: {
      state: StateResolve
    },
    data: {
      state: "Home"
    }
  }
];
