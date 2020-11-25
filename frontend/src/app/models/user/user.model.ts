import { AddressModel, NullAddress, Address } from '../map/address/address.model';

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
  address: AddressModel;
  picture: string;
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
  address: AddressModel = new NullAddress();
  picture: string = null;
}


export class User implements UserModel {
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public password: string,
    public phonenumber: number,
    public addressId: number,
    public gender: string,
    public isAdmin: boolean,
    public wallet: number,
    public address: Address,
    public picture: string
  ) { }

  public static buildFromUserModel(userModel: UserModel): User {
    return new User(
      userModel.userId,
      userModel.firstName,
      userModel.lastName,
      userModel.userName,
      userModel.email,
      userModel.password,
      userModel.phonenumber,
      userModel.addressId,
      userModel.gender,
      userModel.isAdmin,
      userModel.wallet,
      userModel.address,
      userModel.picture
    )
  }

  public toString = () => this.userName;


  public static isUser(user: User): user is User {
    return user.userId
        && user.firstName
        && user.lastName
        && user.userName
        && user.email
        && user.password
        && user.phonenumber
        && user.addressId
        && user.gender
        && (user.isAdmin !== undefined || user.isAdmin !== null)
        && user.wallet
        && user.address
        && Address.isAddress(user.address)
        && user.picture ? true : false;
  }
}
