import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LoginUserResponseModel,
  LoginUserResponseUserModel,
  UserTokenModel,
  isLoginUserResponseUserModel } from '../response/user/login/login-user-response.model';
import { User } from '../user/user.model';

export function toTokenResponse(source: Observable<LoginUserResponseModel>): Observable<UserTokenModel> {
  return source.pipe(map((value: LoginUserResponseModel) => {
    if (isLoginUserResponseUserModel(value as LoginUserResponseUserModel)) {
      return { user: value as LoginUserResponseUserModel, token: null };
    } else {
      return value as UserTokenModel
    }
  }));
}

export function toUser(source: Observable<UserTokenModel>): Observable<User> {
  return source.pipe(map((value: UserTokenModel) => {
    return User.buildFromUserModel(value.user);
  }));
}
