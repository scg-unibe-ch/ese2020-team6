import { Is } from '../../compare/is';
import { AddressResponseModel, AddressResponse } from '../address/address-response.module';
import { UserModel } from '../../user/user.model';

export interface UserResponseModel extends Omit<UserModel, 'address'>{
  address: AddressResponseModel;
}

export class UserResponse implements UserResponseModel {
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
    public address: AddressResponse,
    public picture: string
  ) {}



  public static isUserResponseModel(user: UserResponseModel): user is UserResponseModel {
    let userCopy: any = Object.assign({}, user);
    delete userCopy.address;
    return Is.is(userCopy, [
      'userId', 'firstName', 'lastName', 'userName',
      'email', 'password', 'phonenumber', 'addressId',
      'gender', 'isAdmin', 'wallet', 'picture'
    ]) && AddressResponse.isAddressResponseModel(user.address);
  }
}
