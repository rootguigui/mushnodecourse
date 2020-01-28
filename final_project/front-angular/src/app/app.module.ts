import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.modules';
import { SecureModule } from './secure/secure.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    LocalStorageModule.forRoot({ prefix: 'gw-app', storageType: 'localStorage' }),
  ],
  providers: [
    AuthenticationGuard
   ],
  exports: [
    SecureModule,
    PublicModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
