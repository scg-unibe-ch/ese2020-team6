import { Observable, Subscription, pipe, OperatorFunction} from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserModel } from '../user/user.model';
import { transformator } from './transformator.model';
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

export function transformUser<T>(): OperatorFunction<any, any> {
  return transformator<UserModel, T>(User.buildFromUserModel, 'user', 'User');
}
