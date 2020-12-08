import { RegisterUserRequestModel } from './register-user-request.model';

export interface RegisterUserRequestBuilder{
  buildRegisterUserRequest(): RegisterUserRequestModel;
}
