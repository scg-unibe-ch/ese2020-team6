import { OperatorFunction} from 'rxjs';
import { User, UserModel } from '../user/user.model';
import { transformator } from './transformator';

export function transformUser<T>(): OperatorFunction<any, any> {
  return transformator<UserModel, T>(User.buildFromUserModel, User.isUserModel);
}
