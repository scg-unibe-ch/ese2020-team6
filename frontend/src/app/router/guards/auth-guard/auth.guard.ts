import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { map, defaultIfEmpty, isEmpty, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginUserService } from '../../../services/user/login/login-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginUserService: LoginUserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const nextUrl: UrlTree = this.router.parseUrl('/user/login');
    return this.loginUserService.observables.onLogin.pipe(
      isEmpty(),
      map((isEmpty: boolean) => isEmpty ? nextUrl : true),
      catchError(() => of(nextUrl))
    );
  }

}
