import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


export class LoginRequest {
  constructor(
    public queryValue: String,
    public password: String,
    public isUsername: Boolean
  ) {}
}


export interface LoginRequestBuilder<T> {
  buildLoginRequestBody(form: T): LoginRequest;
}

export interface LoginSubscriber {
  loginRes(res: any);
  loginErr(err: any);
}


export abstract class LoginBase<T> implements LoginRequestBuilder<T>, LoginSubscriber {
  abstract buildLoginRequestBody(form: T): LoginRequest;
  abstract loginRes(res: any);
  abstract loginErr(err: any);

  constructor(
    protected httpClient: HttpClient
  ){ }

  login(requestBody: T) {
    return this.httpClient.post(environment.endpointURL + 'user/login', this.buildLoginRequestBody(requestBody))
    .subscribe((res: any) => this.loginRes(res), (err: any) => this.loginErr(err));
  }
}
