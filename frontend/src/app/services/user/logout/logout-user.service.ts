//Packages
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutUserService {

  public logout(): void {
    localStorage.clear();
  }
}
