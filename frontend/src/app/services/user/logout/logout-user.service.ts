import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutUserService {

  constructor(
    private router: Router
  ) { }

  public logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(['user/login'])
  }
}
