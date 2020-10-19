export interface CutUserModel {
  userName: string;
  email: string;
  userId: number;
}

export class NullCutUser implements CutUserModel {
  userName: string = null;
  email: string = null;
  userId: number = null;
}
