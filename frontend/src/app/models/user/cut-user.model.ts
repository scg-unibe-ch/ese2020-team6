import { UserModel, User } from './user.model';
import { Is } from '../compare/is';
import { Equality } from '../compare/equality';
import { environment } from 'src/environments/environment';

export interface CutUserModel extends Pick<UserModel, 'userName' | 'email' | 'userId' | 'picture'> {}

export class CutUser implements CutUserModel {
  constructor(
    public userId: number,
    public userName: string,
    public email: string,
    public picture: string
  ) { }

  public static buildFromCutUserModel(cutUserModel: CutUserModel): CutUser {
    return new CutUser(
      cutUserModel.userId,
      cutUserModel.userName,
      cutUserModel.email,
      cutUserModel.picture
    )
  }

  get pictureUrl(): string {
    if (this.picture) return environment.endpointURL + this.picture;
    else return undefined;
  }

  public static buildFromUser(user: User): CutUser {
    return this.buildFromCutUserModel(user as unknown as CutUser);
  }

  public toString = () => this.userName;

  public static isCutUser(cutUser: CutUser): cutUser is CutUser {
    return CutUser.isCutUserModel(cutUser as CutUserModel);
  }

  public static isCutUserModel(cutUserModel: CutUserModel): cutUserModel is CutUserModel {
    return Is.is(cutUserModel, ['userId', 'userName', 'email', 'picture']);
  }

  public static equals(cutUserOne: CutUser, cutUserTwo: CutUser): boolean {
    return Equality.equals(cutUserOne, cutUserTwo);
  }
}

export class NullCutUser extends CutUser {
  private static _instance: NullCutUser;

  constructor() {
    super(null, null, null, null);
  }

  public static instance(): NullCutUser {
    if (!NullCutUser._instance) NullCutUser._instance = new NullCutUser();
    return NullCutUser._instance;
  }

}
