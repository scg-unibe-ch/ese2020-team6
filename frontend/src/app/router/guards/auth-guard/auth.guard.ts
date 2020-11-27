import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { map, defaultIfEmpty, isEmpty, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const noLogin: UrlTree = this.router.parseUrl('/user/login');
    return this.userService.getUserObservable().pipe(
      isEmpty(),
      map((isEmpty: boolean) => isEmpty ? noLogin : true),
      catchError(() => of(noLogin))
    );
  }
}
