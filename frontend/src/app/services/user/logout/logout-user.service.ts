import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutUserService {

  public logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
  }
}
