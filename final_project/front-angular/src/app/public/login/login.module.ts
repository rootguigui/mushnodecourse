import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalConfig } from 'src/app/core/global.config';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
