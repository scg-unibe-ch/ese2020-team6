import { CutUserModel, CutUser } from '../../user/cut-user.model';

export interface CutUserResponseModel extends CutUserModel{}

export class CutUserResponse implements CutUserResponseModel {
  constructor(
    public userId: number,
    public userName: string,
    public email: string,
    public picture: string
  ) {}

  public static isCutUserResponseModel(user: CutUserResponseModel): user is CutUserResponseModel {
    return CutUser.isCutUserModel(user);
  }
}
