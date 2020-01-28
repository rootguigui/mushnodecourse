import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


export const PUBLIC_ROUTES: Routes = [
  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent },
      { path: ':token/:email', component: LoginComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
]
