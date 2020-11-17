import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUserService } from './login/login-user.service';
import { LogoutUserService } from './logout/logout-user.service';
import { RegisterUserService } from './register/register-user.service';
import { GetUserService } from './get/get-user.service';
import { LoginUserRequestBuilder } from '../../models/request/user/login/login-user-request-builder.interface';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { LoginUserResponseModel } from '../../models/response/user/login/login-user-response.model';
import { RegisterUserResponseModel } from '../../models/response/user/register/register-user-response.model';
import { UserModel } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';
import { PreferenceModel } from '../../models/user/preference/preference.model';
import { Address } from '../../models/map/address/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userObservable: Observable<UserModel>;

  private subscribers: Array<{
    subscriber: (user: UserModel) => void,
    errSubscriber?: (err: any) => void
  }> = new Array<{
    subscriber: (user: UserModel) => void,
    errSubscriber?: (err: any) => void
  }>();

  constructor(
    private loginUserService: LoginUserService,
    private logoutUserService: LogoutUserService,
    private registerUserService: RegisterUserService,
    private getUserService: GetUserService
  ) {
    this.getUserFromLocalStorage();
  }

  private getUserFromLocalStorage(): void {
    let userId = localStorage.getItem('userId');
    if (userId) {
      this.userObservable = this.getUserService.getUserByIdSecured(parseInt(userId));
      this.userObservable.subscribe((user: UserModel) => {
      }, (err: any) => {
        this.logout();
      })
      this.addSubscriptions();
    }
  }

  public onLogin(subscriber: (user: UserModel) => void, errSubscriber?: (err: any) => void): void {
    this.subscribers.push({
      subscriber: subscriber,
      errSubscriber: errSubscriber
    });
    this.addSubscriptions();
  }

  private addSubscriptions(): void {
    if (this.userObservable) {
      this.subscribers.forEach((subscriber: {
        subscriber: (user: UserModel) => void,
        errSubscriber?: (err: any) => void
      }) => this.userObservable.subscribe(subscriber.subscriber, subscriber.errSubscriber));
    }
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<LoginUserResponseModel> {
    let loginResponse = this.loginUserService.login(requestBuilder).pipe(map((loginResponse: LoginUserResponseModel) => {
      loginResponse.user.address = Address.buildFromAddressModel(loginResponse.user.address);
      return loginResponse;
    }));
    this.userObservable = loginResponse.pipe(map((loginResponse: LoginUserResponseModel) => loginResponse.user));
    loginResponse.subscribe((res: LoginUserResponseModel) => {
      this.saveUserToLocalStorage(res);
    });
    return loginResponse;
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
