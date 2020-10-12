import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/login', requestBuilder.buildLoginUserRequest());
  }
}
