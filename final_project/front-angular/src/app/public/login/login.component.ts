import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public router: Router
  ) {

  }

  public form: FormGroup

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
   }

  public async onSubmit(e) {
    const email = this.form.get('email').value
    const password = this.form.get('password').value
    let result = await this.authService.login(email, password)
    if (result) {
      this.router.navigate(['home'])
    }
  }

}
