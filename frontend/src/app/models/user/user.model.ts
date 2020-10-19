export interface UserModel {
  firstName: string;
  lastName: string;
  gender: string;
  userName: string;
  email: string;
  password: string;
  phonenumber: number;
  plz: number;
  city: string;
  street: string;
  houseNumber: string;
  createdAt: string;
  isAdmin: boolean;
  userId: number;
  wallet: number;
}

export class NullUser implements UserModel {
  firstName: string = null;
  lastName: string = null;
  gender: string = null;
  userName: string = null;
  email: string = null;
  password: string = null;
  phonenumber: number = null;
  plz: number = null;
  city: string = null;
  street: string = null;
  houseNumber: string = null;
  createdAt: string = null;
  isAdmin: boolean = null;
  userId: number = null;
  wallet: number = null;
}
