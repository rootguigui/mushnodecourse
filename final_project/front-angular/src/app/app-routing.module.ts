import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SECURE_ROUTES } from './secure/secure.routes';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { PUBLIC_ROUTES } from './public/public.routes';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: SecureComponent, canActivate: [AuthenticationGuard], children: SECURE_ROUTES },
  { path: '', component: PublicComponent, children: PUBLIC_ROUTES },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
