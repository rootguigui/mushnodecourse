import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {

        if (this.authService.isLoggedIn())
            return true;

        this.authService.redirectUrl = url;
        this.router.navigate(['login']);
        return false;
    }
}
