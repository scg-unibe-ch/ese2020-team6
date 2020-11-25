import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUserService } from './login/login-user.service';
import { RegisterUserService } from './register/register-user.service';
import { GetUserService } from './get/get-user.service';
import { RegisterUserRequestBuilder } from '../../models/request/user/register/register-user-request-builder.interface';
import { RegisterUserResponseModel } from '../../models/response/user/register/register-user-response.model';
import { UserModel } from '../../models/user/user.model';
import { CutUserModel } from '../../models/user/cut-user.model';
import { PreferenceModel } from '../../models/user/preference/preference.model';
import { Address } from '../../models/map/address/address.model';
import { environment } from '../../../environments/environment'

import { OnLoad } from '../on-load';

@Injectable({
  providedIn: 'root'
})
export class UserService extends OnLoad<UserModel> {

  constructor(
    private httpClient: HttpClient,
    private loginUserService: LoginUserService,
    private registerUserService: RegisterUserService,
    private getUserService: GetUserService
  ) {
    super();
    this.loginUserService.events.onLoad(() => {
      this.load()
    }, OnLoad.catchError)
  }

  public getUserById(userId: number): Observable<CutUserModel> {
    return this.getUserService.getUserByIdUnsecured(userId);
  }

  public getUserObservable(): Observable<UserModel> {
    return this.observables.onLoad;
  }

  public register(formData: any): Observable<RegisterUserResponseModel> {
    return this.httpClient.post<RegisterUserResponseModel>(
      environment.endpointURL + 'user/register', formData);
    //return this.registerUserService.register(requestBuilder);
  }

  protected loadObservable(): Observable<UserModel> {
    return this.loginUserService.getUserObservable();
  }
}
