import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { PublicComponent } from './public.component';
import { LoginModule } from './login/login.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PUBLIC_ROUTES } from './public.routes';
import { HttpClientModule } from '@angular/common/http';
import { GlobalConfig } from '../core/global.config';
import { GlobalService } from '../core/services/global.service';

@NgModule({
  declarations:[ ],
  providers: [
    GlobalConfig,
    GlobalService
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(PUBLIC_ROUTES, { useHash: false })
  ],
  exports: [
    LoginModule
  ]
})
export class PublicModule {}
