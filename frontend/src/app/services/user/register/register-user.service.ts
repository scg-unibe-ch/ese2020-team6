import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { RegisterUserRequestBuilder } from '../../../models/request/user/register/register-user-request-builder.interface';
import { RegisterUserResponseModel } from '../../../models/response/user/register/register-user-response.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public register(requestBuilder: RegisterUserRequestBuilder): Observable<RegisterUserResponseModel> {
    return this.httpClient.post<RegisterUserResponseModel>(environment.endpointURL + 'user/register', requestBuilder.buildRegisterUserRequest()).pipe(share());
  }
}
