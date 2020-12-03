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

export class User implements UserModel {


  public static NullUser: User = new User(null, null, null, null, null, null,
    null, null, null, null, null, new NullAddress(), null);

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
      Address.buildFromAddressModel(userModel.address),
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

  public static equals(userOne: User, userTwo: User): boolean {
    return userOne.equals(userTwo);
  }

  public equals(user: User): boolean {
    return user.userId === this.userId
        && user.firstName === this.firstName
        && user.lastName === this.lastName
        && user.userName === this.userName
        && user.email === this.email
        && user.password === this.password
        && user.phonenumber === this.phonenumber
        && user.addressId === this.addressId
        && user.gender === this.gender
        && user.isAdmin === this.isAdmin
        && user.wallet === this.wallet
        && Address.equals(user.address, this.address)
        && user.picture === this.picture
  }

  public static isLoggedIn(user: User): boolean {
    return User.isUser(user);
  }
}
