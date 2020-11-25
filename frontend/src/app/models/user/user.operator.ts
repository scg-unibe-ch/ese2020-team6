import { Observable, Subscription, pipe} from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserModel } from './user.model';
import { transformator } from '../operator/transformator.model';
import {
  LoginUserResponseModel,
  LoginUserResponseUserModel,
  LoginUserResponseUserTokenModel,
  isLoginUserResponseUserModel,
  isLoginUserResponseUserTokenModel } from '../response/user/login/login-user-response.model';

export function transformToTokenResponse(source: Observable<LoginUserResponseModel>): Observable<LoginUserResponseUserTokenModel> {
  return source.pipe(map((value: LoginUserResponseModel) => {
    if (isLoginUserResponseUserModel(value as LoginUserResponseUserModel)) {
      return { user: value as LoginUserResponseUserModel, token: null };
    } else {
      return value as LoginUserResponseUserTokenModel
    }
  }));
}

export function transformUser<T>(source: Observable<T>): Observable<T> {
  return transformator<UserModel, T>(source, User.buildFromUserModel, 'user', 'User');
}
