import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
        const currentUser = this.authenticationService.currentUserValue();
        console.log("hello");
        console.log(route.data);
            if (currentUser) {
                // logged in so return true
                console.log(currentUser);
                return true;
             
            }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    // checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    //     if (this.authenticationService.isLoggedIn()) {
    //       const userRole = this.authenticationService.getRole();
    //       if (route.data.role && route.data.role.indexOf(userRole) === -1) {
    //         this.router.navigate(['/home']);
    //         return false;
    //       }
    //       return true;
    //     }
    
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
}
