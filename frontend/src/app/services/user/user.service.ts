import { Injectable } from '@angular/core';
import { LoginUserService } from './login/login-user.service';
import { LogoutUserService } from './logout/logout-user.service';
import { RegisterUserService } from './register/register-user.service';
import { LoginUserRequestBuilder } from '../../models/request/user/login/login-user-request-builder.interface';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserResponseModel } from '../../models/response/user/login/login-user-response.model';
import { UserModel } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: UserModel;

  constructor(
    private loginUserService: LoginUserService,
    private logoutUserService: LogoutUserService,
    private registerUserService: RegisterUserService,
    private httpClient: HttpClient
  ) {
    if (localStorage.getItem('userId')) {
        httpClient.get(environment.endpointURL + 'user/userid:' + localStorage.getItem('userId')).subscribe((res: any) => {
          this._user = res;
        });
    }
  }

  public login(requestBuilder: LoginUserRequestBuilder): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.loginUserService.login(requestBuilder).subscribe((res: LoginUserResponseModel) => {
        this.loginSuccess(res);
        resolve(true);
      }, (err: any) => reject(err))
    });
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
    localStorage.setItem('userId', this.user.userId.toString());
  }

  get user(): UserModel {
    return this.isLoggedIn ? this._user : null;
  }

  get isLoggedIn(): boolean {
    return this._user ? true : false;
  }

  get isAdmin(): boolean {
    return this.isLoggedIn ? this.user.isAdmin : false;
  }

  public logout(): void {
    return this.logoutUserService.logout();
  }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<Object> {
    return this.registerUserService.register(requestBuilder);
  }
}
