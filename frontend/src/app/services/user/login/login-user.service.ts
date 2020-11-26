//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnLoad } from '../../on-load';
import { Observable, of, throwError } from 'rxjs';
import { share, pluck, catchError, retry, isEmpty } from 'rxjs/operators';
import { UserModel, NullUser } from '../../../models/user/user.model';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserRequestModel } from '../../../models/request/user/login/login-user-request.model';
import { LoginUserResponseModel, LoginUserResponseUserTokenModel, isLoginUserResponseUserTokenModel, isLoginUserResponseUserModel } from '../../../models/response/user/login/login-user-response.model';
import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/map/address/address.operator';
import { transformUser, transformToTokenResponse} from '../../../models/user/user.operator';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService extends OnLoad<UserModel> implements LoginUserRequestBuilder {

  private onLoginEventName = 'onLogin';
  private onLogoutEventName = 'onLogout';

  public isLoggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    super();
    this.addEvent<LoginUserResponseModel>(this.onLoginEventName);
    this.addEvent<string>(this.onLogoutEventName);

    this.loadOn(this.events.onLogin);
    this.events.onLogin((res: LoginUserResponseUserTokenModel) => {
      this.saveUserToLocalStorage(res);
      this.isLoggedIn = true;
    }, (err: any) => {
      this.logout();
    });

    this.events.onLogout(() => {
      this.navigateToLogin();
      this.removeUserFromLocalStorage();
      this.isLoggedIn = false;
    });
    this.login(this);
  }

  public login(requestBuilder: LoginUserRequestBuilder): LoginUserService {
    try {
      let request: LoginUserRequestModel = requestBuilder.buildLoginUserRequest();
      this.setObservable<LoginUserResponseUserTokenModel>(this.onLoginEventName, this.sendLoginRequest(requestBuilder));
    } catch (error) {
      this.setObservable<LoginUserResponseUserTokenModel>(this.onLoginEventName, throwError(error));
    }
    return this;
  }

  public buildLoginUserRequest(): LoginUserRequestModel {
    let userId = parseInt(localStorage.getItem('userId'));
    if (isNaN(userId)) throw new Error('No User Id is parasable from localStorage!');
    else return { userId: userId };
  }

  public logout(): LoginUserService {
    this.setObservable<boolean>(this.onLogoutEventName, of(false));
    return this;
  }

  private saveUserToLocalStorage(res: LoginUserResponseUserTokenModel): void {
    if (res && res.token) {
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userId', res.user.userId.toString());
    }
  }

  private navigateToLogin(): void {
    if (this.isLoggedIn) this.router.navigate(['user/login'])
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
  }

  get userObservable(): Observable<UserModel> {
    return this.loadObservable();
  }

  protected sendLoginRequest(requestBuilder: LoginUserRequestBuilder): Observable<LoginUserResponseUserTokenModel> {
    return this.httpClient.post<LoginUserResponseModel>(environment.endpointURL + 'user/login', requestBuilder.buildLoginUserRequest())
    .pipe(share(), transformToTokenResponse, transformUser, transformAddress);
  }

  protected loadObservable(): Observable<UserModel> {
    return this.getObservable<LoginUserResponseUserTokenModel>(this.onLoginEventName)
    .pipe(pluck('user'));
  }

}
