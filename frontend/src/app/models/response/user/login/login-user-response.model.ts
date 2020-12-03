//Models
import { UserModel, User } from '../../../user/user.model';

export type LoginUserResponseModel = LoginUserResponseUserModel | UserTokenModel;

export interface LoginUserResponseUserModel extends UserModel {};
export interface UserTokenModel {
  user: UserModel;
  token: string;
}

export class NullUserTokenModel implements UserTokenModel {
  public user: UserModel = User.NullUser;
  public token: string = null;
}

export function isUserTokenModel(response: UserTokenModel): response is UserTokenModel {
  return response.user && (response.token === null || response.token == null || response.token) ? true : false;
}

export function isLoginUserResponseUserModel(response: LoginUserResponseUserModel): response is LoginUserResponseUserModel {
  return User.isUser(response as User) ? true : false;
}
