//Models
import { UserModel, User } from '../../../user/user.model';

export type LoginUserResponseModel = LoginUserResponseUserModel | LoginUserResponseUserTokenModel;

export interface LoginUserResponseUserModel extends UserModel {};
export interface LoginUserResponseUserTokenModel {
  user: UserModel;
  token: string;
}

export function isLoginUserResponseUserTokenModel(response: LoginUserResponseUserTokenModel): response is LoginUserResponseUserTokenModel {
  return response.user && response.token ? true : false;
}

export function isLoginUserResponseUserModel(response: LoginUserResponseUserModel): response is LoginUserResponseUserModel {
  return User.isUser(response) ? true : false;
}
