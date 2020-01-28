import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class HomeModule {}
