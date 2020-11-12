export interface UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phonenumber: number;
  addressId: number;
  gender: string;
  isAdmin: boolean;
  wallet: number;
}

export class NullUser implements UserModel {
  userId: number = null;
  firstName: string = null;
  lastName: string = null;
  userName: string = null;
  email: string = null;
  password: string = null;
  phonenumber: number = null;
  addressId: number = null;
  gender: string = null;
  isAdmin: boolean = null;
  wallet: number = null;
}
