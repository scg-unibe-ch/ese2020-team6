import { Injectable } from '@angular/core';
import { LoginUserService } from './login/login-user.service';
import { LogoutUserService } from './logout/logout-user.service';
import { RegisterUserService } from './register/register-user.service';
import { LoginUserRequestBuilder } from '../../models/request/user/login/login-user-request-builder.interface';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserResponseModel } from '../../models/response/user/login/login-user-response.model';
import { UserModel } from '../../models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: UserModel;

  constructor(
    private loginUserService: LoginUserService,
    private logoutUserService: LogoutUserService,
    private registerUserService: RegisterUserService
  ) { }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<Object> {
    const loginResponse: Observable<Object> = this.loginUserService.login(requestBuilder);
    loginResponse.subscribe((res: LoginUserResponseModel) => this.loginSuccess(res));
    return loginResponse;
  }

  private loginSuccess(res: LoginUserResponseModel): void {
    this.saveUser(res.user);
    this.saveUserToLocalStorage(res.token);
  }

  private saveUser(user: UserModel): void {
    this._user = user;
  }

  private saveUserToLocalStorage(token: string): void {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userName', this.user.userName);
    localStorage.setItem('userId', this.user.userId.toString());
    localStorage.setItem('isAdmin', this.user.isAdmin.toString());
    localStorage.setItem('wallet', this.user.wallet.toString());
  }

  get user(): UserModel {
    return this._user;
  }

  get isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  get isAdmin(): boolean {
    return this.user.isAdmin;
  }

  public logout(): void {
    return this.logoutUserService.logout();
  }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<Object> {
    return this.registerUserService.register(requestBuilder);
  }
}
