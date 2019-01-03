import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    //RouterStateSnapshot is for the info being added as login page's returnUrl param
    // This info is then saved to localStorage 
    // localStorage is wiped after redirected from google, just so now using queryParams
    return this.auth.user$.pipe(
      map(user => {
        if (user) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      })
    )
  }
}
