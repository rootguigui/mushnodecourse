import { NgModule } from "@angular/core";
import { SecureComponent } from './secure.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { StateResolve } from '../core/component/staterasolve';
import { GlobalService } from '../core/services/global.service';

@NgModule({
  declarations: [ StateResolve ],
  imports: [
    BrowserModule,
    HomeModule
  ],
  exports: [],
  providers: [
    StateResolve,
    GlobalService
  ]
})
export class SecureModule { }
