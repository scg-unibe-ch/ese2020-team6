import { LoginUserRequestModel } from './login-user-request.model';

export interface LoginUserRequestBuilder{
  buildLoginUserRequest(): LoginUserRequestModel;
}
