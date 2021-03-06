import { AddressModel, NullAddress, Address } from '../map/address/address.model';
import { Equality } from '../compare/equality';
import { Is } from '../compare/is';
import { CutUser } from './cut-user.model';
import { environment } from 'src/environments/environment';
import { UserResponseModel } from '../response/response.module';

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

  get pictureUrl(): string {
    if (this.picture !== 'undefined' || this.picture !== null) return environment.endpointURL + this.picture;
    else return undefined;
  }

  get hasPicture(): boolean {
    if (this.picture === 'undefined' || this.picture === null) return false;
    else return true;
  }

  public cutUser(): CutUser {
    return CutUser.buildFromUser(this);
  }

  public static buildFromUserModel(user: UserModel): User {
    return new User(
      user.userId,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password,
      user.phonenumber,
      user.addressId,
      user.gender,
      user.isAdmin,
      user.wallet,
      Address.buildFromAddressModel(user.address),
      user.picture
    )
  }

  public static buildFromUserResponseModel(user: UserResponseModel): User {
    return new User(
      user.userId,
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.password,
      user.phonenumber,
      user.addressId,
      user.gender,
      user.isAdmin,
      user.wallet,
      Address.buildFromAddressResponseModel(user.address),
      user.picture
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
      'userId', 'firstName', 'lastName', 'userName',
      'email', 'password', 'phonenumber', 'addressId',
      'gender', 'isAdmin', 'wallet', 'picture'
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

export class NullUser extends User {
  private static _instance: NullUser;

  constructor() {
    super(null, null, null, null, null, null,
      null, null, null, null, null, NullAddress.instance(), null);
  }

  public static instance(): NullUser {
    if (!NullUser._instance) NullUser._instance = new NullUser();
    return NullUser._instance;
  }

}
