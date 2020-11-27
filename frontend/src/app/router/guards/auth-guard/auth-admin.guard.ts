import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { pluck, defaultIfEmpty, catchError, isEmpty, mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { UserModel } from '../../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const noLogin: UrlTree = this.router.parseUrl('/user/login');

    let pathSegmentArray: Array<string> = state.url.split("/").reverse();
    console.log(next);

    pathSegmentArray[0] = next.data.canActivateDestination;
    const noAdmin: UrlTree = this.router.parseUrl(pathSegmentArray.reverse().join("/"));

    return this.userService.getUserObservable().pipe(
      map((user: UserModel) => user.isAdmin ? true : noAdmin),
      defaultIfEmpty(noLogin),
      catchError(() => of(noLogin))
    );
  }

}
