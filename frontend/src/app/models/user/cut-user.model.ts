export interface CutUserModel {
  userName: string;
  email: string;
  userId: number;
  picture: string;
}

export class NullCutUser implements CutUserModel {
  userName: string = null;
  email: string = null;
  userId: number = null;
  picture: string = null;
}
