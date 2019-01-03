import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean>{
  //   this.auth.user$.pipe(
  //     map(user => {
  //       return this.userService.get(user.uid);
  //     })
  //   ).subscribe(x => x.valueChanges().subscribe(x => {
  //     return x.isAdmin
  //   }));
  // }
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()),
      map (appUser => appUser.isAdmin)
    )
    
  }
}
