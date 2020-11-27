//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnLoad } from '../../on-load';
import { Observable, of, throwError, empty } from 'rxjs';
import { share, pluck, catchError, retry, isEmpty } from 'rxjs/operators';
import { UserModel, NullUser } from '../../../models/user/user.model';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel, LoginUserResponseUserTokenModel, isLoginUserResponseUserTokenModel, isLoginUserResponseUserModel } from '../../../models/response/user/login/login-user-response.model';
import { environment } from '../../../../environments/environment';
import {
  transformAddress,
  transformUser,
  transformToTokenResponse} from '../../../models/operator/operators.module';
import { ILoaderObserver } from '../../loader-observer.interface';
import { LoaderObservable } from '../../loader-observable.interface';
import { Loader } from '../../loader.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService extends Loader<LoginUserResponseUserTokenModel> implements LoginUserRequestBuilder {

  private requestBuilder: LoginUserRequestBuilder;
  private isLoggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    super();
    this.successSubscription = this.subscribeOnSuccess(this);
    this.failSubscription = this.subscribeOnFail(this);
    this.login(this)
  }



  public login(requestBuilder: LoginUserRequestBuilder): LoginUserService {
    this.requestBuilder = requestBuilder;
    this.load();
    return this;
  }
  public logout(): LoginUserService {
    return this.removeUserFromLocalStorage().navigateToLogin();
  }




  private navigateToLogin(): LoginUserService {
    if(this.isLoggedIn) this.router.navigate(['user/login'])
    return this;
  }
  private saveUserToLocalStorage(login: LoginUserResponseUserTokenModel): LoginUserService {
    if (login && login.token) {
      localStorage.setItem('userToken', login.token);
      localStorage.setItem('userId', login.user.userId.toString());
    }
    return this;
  }
  private removeUserFromLocalStorage(): LoginUserService {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    return this;
  }



  protected buildObservable(): Observable<LoginUserResponseUserTokenModel> {
    return this.sendLoginRequest();
  }
  protected sendLoginRequest(): Observable<LoginUserResponseUserTokenModel> {
    return this.httpClient.post<LoginUserResponseModel>(environment.endpointURL + 'user/login', this.requestBuilder.buildLoginUserRequest())
    .pipe(share(), transformToTokenResponse, transformUser(), transformAddress());
  }
  public buildLoginUserRequest(): LoginUserRequestModel {
    let userId = parseInt(localStorage.getItem('userId'));
    if (isNaN(userId)) throw new Error('No User Id is parasable from localStorage!');
    else return { userId: userId };
  }


  public onSuccess(login: LoginUserResponseUserTokenModel): void {
    this.saveUserToLocalStorage(login)
  }
  public onFail(error: any): void {
    this.logout()
  }
  public onLoading(): void {

  }
  public onLoaded(): void {

  }

}
