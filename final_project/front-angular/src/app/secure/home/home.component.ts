import { Component } from "@angular/core";
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public logoff() {
    this.authService.logoff();
    this.router.navigate(['login']);
  }

}
