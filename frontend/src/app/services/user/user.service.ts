import { Injectable } from '@angular/core';
import { LoginUserService } from './login/login-user.service';
import { LogoutUserService } from './logout/logout-user.service';
import { RegisterUserService } from './register/register-user.service';
import { LoginUserRequestBuilder } from '../../models/request/user/login/login-user-request-builder.interface';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private loginUserService: LoginUserService,
    private logoutUserService: LogoutUserService,
    private registerUserService: RegisterUserService
  ) { }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<any> {
    return this.loginUserService.login(requestBuilder);
  }

  public logout(): void {
    return this.logoutUserService.logout();
  }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<any> {
    return this.registerUserService.register(requestBuilder);
  }
}
