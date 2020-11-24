import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUserService } from './login/login-user.service';
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

import { OnLoad } from '../on-load';

@Injectable({
  providedIn: 'root'
})
export class UserService extends OnLoad<UserModel> {

  constructor(
    private loginUserService: LoginUserService,
    private registerUserService: RegisterUserService,
    private getUserService: GetUserService
  ) {
    super();
    this.load();
    this.events.onLoad(null, (error: any) => this.loginUserService.logout());
    this.loginUserService.events.onLogin(() => {
      this.load()
    })
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public getUserObservable(): Observable<UserModel> {
    return this.getObservable.onLoad();
  }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<RegisterUserResponseModel> {
    return this.registerUserService.register(requestBuilder);
  }

  protected loadObservable(): Observable<UserModel> {
    let userId = localStorage.getItem('userId');
    if (!isNaN(parseInt(userId))) {
      return this.getUserService.getUserByIdSecured(parseInt(userId));
    } else return this.loginUserService.getUserObservable();
  }
}
