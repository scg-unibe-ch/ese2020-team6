import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginUserService } from './login/login-user.service';
import { LogoutUserService } from './logout/logout-user.service';
import { RegisterUserService } from './register/register-user.service';
import { GetUserService } from './get/get-user.service';
import { PreferenceService } from './preference/preference.service';
import { LoginUserRequestBuilder } from '../../models/request/user/login/login-user-request-builder.interface';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserResponseModel } from '../../models/response/user/login/login-user-response.model';
import { RegisterUserResponseModel } from '../../models/response/user/register/register-user-response.model';
import { UserModel } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userObservable: Observable<UserModel>;

  constructor(
    private loginUserService: LoginUserService,
    private logoutUserService: LogoutUserService,
    private registerUserService: RegisterUserService,
    private getUserService: GetUserService,
    private preferenceService: PreferenceService
  ) {
    this.getUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): void {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.userObservable = this.getUserService.getUserByIdSecured(parseInt(userId));
      this.userObservable.subscribe(()=>{}, (err: any) => {
        this.logout();
      })
    }
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<LoginUserResponseModel> {
    let loginResponse = this.loginUserService.login(requestBuilder);
    loginResponse.subscribe((res: LoginUserResponseModel) => {
      this.loginSuccess(res);
    });
    return loginResponse;
}

  private loginSuccess(res: LoginUserResponseModel): void {
    this.userObservable = of(res.user);
    this.saveUserToLocalStorage(res);
  }

  private saveUserToLocalStorage(res: LoginUserResponseModel): void {
    localStorage.setItem('userToken', res.token);
    localStorage.setItem('userId', res.user.userId.toString());
  }

  get isLoggedIn(): boolean {
    return this.userObservable ? true : false;
  }

  public logout(): void {
    this.logoutUserService.logout();
    this.userObservable = null;
  }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<RegisterUserResponseModel> {
    return this.registerUserService.register(requestBuilder);
  }
}
