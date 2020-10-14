import { UserModel } from '../../../user/user.model';

export interface LoginUserResponseModel {
  token: string;
  user: UserModel;
}
