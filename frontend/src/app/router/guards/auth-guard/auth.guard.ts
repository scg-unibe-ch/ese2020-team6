import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.userService.events.onLoad((user: UserModel) => {
      if (!user) this.router.navigate(['user/login'])
    });
    return this.userService.getUserObservable().pipe(map((user: UserModel) => user ? true : false));
  }

}
