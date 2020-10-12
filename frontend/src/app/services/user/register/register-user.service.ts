import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'user/register', requestBuilder.buildRegisterUserRequest());
  }
}
