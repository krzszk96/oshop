import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    // return this.auth.user$
    // .pipe(switchMap(user => this.userService.get(user.uid)))
    // .pipe(map(appUser => appUser.isAdmin));
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
