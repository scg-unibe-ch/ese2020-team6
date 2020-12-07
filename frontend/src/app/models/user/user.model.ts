import { AddressModel, NullAddress, Address } from '../map/address/address.model';
import { Equality } from '../compare/equality';
import { Is } from '../compare/is';
import { CutUser } from './cut-user.model';

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

  public cutUser(): CutUser {
    return CutUser.buildFromUser(this);
  }

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
    return User.isUserModel(user as UserModel);
  }

  public static isUserModel(user: UserModel): user is UserModel {
    let userCopy: any = Object.assign({}, user);
    delete userCopy.address;
    return Is.is(userCopy, [
      'userId',
      'firstName',
      'lastName',
      'userName',
      'email',
      'password',
      'phonenumber',
      'addressId',
      'gender',
      'isAdmin',
      'wallet',
      'picture'
    ]) && Address.isAddressModel(user.address);
  }

  public static equals(userOne: User, userTwo: User): boolean {
    let userOneCopy: any = Object.assign({}, userOne);
    let userTwoCopy: any = Object.assign({}, userTwo);
    delete userOneCopy.address;
    delete userTwoCopy.address;
    return Equality.equals(userOneCopy, userTwoCopy)
        && Equality.equals(userOne.address, userTwo.address);
  }

  public static isLoggedIn(user: User): boolean {
    return User.isUser(user);
  }
}
