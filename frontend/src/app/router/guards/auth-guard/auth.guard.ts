import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean | UrlTree> | UrlTree {
    const goToLogin: UrlTree = this.router.parseUrl('/user/login');
    return this.userService.isLoggedIn().pipe(map((isLoggedIn: boolean) => isLoggedIn ? true : goToLogin))
  }
}
