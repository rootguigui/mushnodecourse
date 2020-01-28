import { Injectable } from "@angular/core";
import { AuthenticationToken } from './authentication.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { GlobalConfig } from '../global.config';

@Injectable()
export class AuthenticationService {
  currentUser: AuthenticationToken;
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private config: GlobalConfig
  ) {
    this.fill();
  }

  public login(email: string, password: string): Promise<any> {

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.apiUrl + 'auth', { email, password }, { headers: headers }
      ).toPromise()
        .then(response => {
          this.currentUser = <AuthenticationToken>response;
          this.localStorageService.set('currentUser', this.currentUser);
          resolve(response);
        })
        .catch(reason => reject(reason))
    })
  }


  public logoff(): void {
    this.localStorageService.remove("currentUser");
  }

  public isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  private fill() {
    this.currentUser = <AuthenticationToken>this.localStorageService.get('currentUser');
  }

  public getAuthorizationHeader(): string {
    if (this.currentUser) {
      return this.currentUser.token;
    }

    return "";
  }
}
