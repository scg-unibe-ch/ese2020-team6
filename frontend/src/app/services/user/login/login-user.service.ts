//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnObservalbeEvents } from '../../on-observable-events';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { UserModel } from '../../../models/user/user.model';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/map/address/address.operator';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService extends OnObservalbeEvents {

  private onLoginEventName: string = 'onLogin';
  private onLogoutEventName: string = 'onLogout';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    super();
    this.addEvent<LoginUserResponseModel>(this.onLoginEventName);
    this.addEvent<string>(this.onLogoutEventName);
    this.events.onLogin((res: LoginUserResponseModel) => {
      this.saveUserToLocalStorage(res);
    })

    this.events.onLogout(() => {
      this.navigateToLogin();
      this.removeUser();
      this.removeUserFromLocalStorage();
    })

  }

  public login(requestBuilder: LoginUserRequestBuilder): LoginUserService {
    this.setObservable<LoginUserResponseModel>(this.onLoginEventName, this.loginObservable(requestBuilder));
    return this;
  }

  public getUserObservable(): Observable<UserModel> {
    return this.getObservableForOneEvent<LoginUserResponseModel>(this.onLoginEventName).pipe(map((res: LoginUserResponseModel) => res.user));
  }

  protected loginObservable(requestBuilder: LoginUserRequestBuilder): Observable<LoginUserResponseModel> {
    return this.httpClient.post<LoginUserResponseModel>(environment.endpointURL + 'user/login', requestBuilder.buildLoginUserRequest()).pipe(share(), transformAddress);
  }

  private saveUserToLocalStorage(res: LoginUserResponseModel): void {
    localStorage.setItem('userToken', res.token);
    localStorage.setItem('userId', res.user.userId.toString());
  }

  public logout(): LoginUserService {
    this.setObservable<string>(this.onLogoutEventName, of("logout"));
    console.log(this.getObservable.onLogout());

    return this;
  }

  private navigateToLogin(): void {
    this.router.navigate(['user/login'])
  }

  private removeUser(): void {
    this.resetAllSubscriptions();
    this.addEvent<LoginUserResponseModel>(this.onLoginEventName);
    this.addEvent<void>(this.onLogoutEventName);
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
  }
}
