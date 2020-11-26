import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { pluck, defaultIfEmpty, catchError, isEmpty, mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginUserService } from '../../../services/user/login/login-user.service';
import { UserModel } from '../../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginUserService: LoginUserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const nextUrl: UrlTree = this.router.parseUrl('/user/login');

    return true;
  }

}
