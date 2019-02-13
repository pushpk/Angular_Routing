import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service"
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild{
    
    constructor(private authService : AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

        return this.authService.isAuthenticated().then(
            (isAuthenticated : boolean) => {
                if(isAuthenticated)
                {
                    console.log("user is authenticated");
                    return true;
                }
                else{
                    console.log("user is NOT authenticated");
                    this.router.navigate(['/']);
                    return false;
                }

            }
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivate(route, state);
    }
}