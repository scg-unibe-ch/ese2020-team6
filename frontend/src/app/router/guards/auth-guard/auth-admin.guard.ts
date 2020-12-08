import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../../../services/user/user.service';

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
  ): Observable<boolean | UrlTree> {
    const goToLogin: UrlTree = this.router.parseUrl('/user/login');
    let pathSegmentArray: Array<string> = state.url.split("/").reverse();
    pathSegmentArray[0] = next.data.canActivateDestination;
    const goToDesination: UrlTree = this.router.parseUrl(pathSegmentArray.reverse().join("/"));
    return this.userService.isAdmin().pipe(map(([isLoggedIn, isAdmin]: [boolean, boolean]) => {
      if (!isLoggedIn) return goToLogin;
      else if (!isAdmin) return goToDesination;
      else return true;
    }, catchError((error: any) => of(goToLogin))))
  }

}
