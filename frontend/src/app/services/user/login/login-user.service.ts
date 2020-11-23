//Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoginUserRequestBuilder } from '../../../models/request/user/login/login-user-request-builder.interface';
import { LoginUserResponseModel } from '../../../models/response/user/login/login-user-response.model';
import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/map/address/address.operator';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(requestBuilder: LoginUserRequestBuilder): Observable<LoginUserResponseModel> {
    return this.httpClient.post<LoginUserResponseModel>(environment.endpointURL + 'user/login', requestBuilder.buildLoginUserRequest()).pipe(share(), transformAddress);
  }
}
