import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe} from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
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
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isLoggedIn) {
      const isAdminObservable: Observable<boolean> = this.userService.userObservable.pipe(pluck('isAdmin'));
      isAdminObservable.subscribe((isAdmin: boolean) => {
        if (!isAdmin) {
          let pathSegmentArray: Array<string> = state.url.split("/").reverse();
          pathSegmentArray[0] = 'purchase';
          this.router.navigate([pathSegmentArray.reverse().join("/")])
        }
      });
      return isAdminObservable;
    } else {
      return true;
    }
  }

}
