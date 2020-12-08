//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoginUserRequestBuilder, LoginUserRequestModel } from 'src/app/models/request/request.module';
import { LoginUserResponseModel, UserTokenModel } from '../../../models/response/user/login/login-user-response.model';
import { environment } from '../../../../environments/environment';
import {
  transformAddress,
  transformUser,
  toTokenResponse} from '../../../models/operator/index.module';
import { LoaderObservable, ValueLoader } from '../../service.module';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService extends LoaderObservable<UserTokenModel, UserTokenModel> implements LoginUserRequestBuilder {

  private _source: Observable<UserTokenModel>;

  private isLoggedIn = false;

  private loginSuccess = (login: UserTokenModel) => {
    this.saveUserToLocalStorage(login)
    .then(() => this.isLoggedIn = true);
  }
  private loginFailure = () => this.logout();

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    super();
    this.subscribe(new ValueLoader(this.loginSuccess, this.loginFailure));
    this.login();
  }

  public login(requestBuilder ?: LoginUserRequestBuilder): void {
    try {
      if (!this.isLoggedIn) {
        if (!requestBuilder) requestBuilder = this;
        this.sendLoginRequest(requestBuilder.buildLoginUserRequest())
        this.load()
      } else this.load()
    } catch (error) {
      this.logout();
    }
  }
  public logout(): void {
    this.removeUserFromLocalStorage()
    .then(() => this.removeUser())
    .then(() => this.navigateToLogin())
    .then(() => this.isLoggedIn = false);
  }

  protected postProcess(loadedPromise: Promise<UserTokenModel>): Promise<UserTokenModel> {
    return loadedPromise;
  }


  private removeUser(): Promise<void> {
    this.resetSource();
    return this.unload();
  }
  private navigateToLogin(): Promise<void> {
    if (this.isLoggedIn) this.router.navigate(['user/login'])
    return Promise.resolve();
  }
  private saveUserToLocalStorage(login: UserTokenModel): Promise<UserTokenModel> {
    if (login && login.token) {
      localStorage.setItem('userToken', login.token);
      localStorage.setItem('userId', login.user.userId.toString());
    }
    return Promise.resolve(login);
  }
  private removeUserFromLocalStorage(): Promise<void> {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    return Promise.resolve();
  }

  protected sendLoginRequest(request: LoginUserRequestModel): void {
    let loginRequestObservable = this.httpClient.post<LoginUserResponseModel>(environment.endpointURL + 'user/login', request)
    .pipe(share(), toTokenResponse, transformUser(), transformAddress());
    this.setSource(loginRequestObservable);
  }
  public buildLoginUserRequest(): LoginUserRequestModel {
    let userId = parseInt(localStorage.getItem('userId'));
    if (isNaN(userId)) throw new Error('No User Id is parasable from localStorage!');
    else return { userId: userId };
  }

  public getSource(): Observable<UserTokenModel> {
    return this._source;
  }
  public setSource(source: Observable<UserTokenModel>): Promise<Observable<UserTokenModel>> {
    return Promise.resolve(this._source = source);
  }
  public resetSource(): Promise<void> {
    return new Promise<void>(resolve => {
      this._source = undefined
      resolve();
    })
  }

}
