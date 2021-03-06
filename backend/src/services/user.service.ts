import { Transaction, Op } from 'sequelize';
import { User, UserAttributes} from '../models/user.model';
import { Address, AddressAttributes } from '../models/address.model';
import { AddressService } from './address.service';
import { OrderService } from './order.service';
import { OrderSubType } from '../interfaces/order-sub-type.interface';
import {
  LoginResponse,
  LoginRequest,
  LoginWithUsernameEmail,
  LoginWithToken,
  isLoginWithUserNameEmail,
  isLoginWithToken } from '../interfaces/login.interface';
import { CO } from '../interfaces/orders.interface';
import { DecodedToken, Token } from '../interfaces/token.interface';
import { StatusError } from '../errors/status.error';
import bcrypt from 'bcrypt';

interface HasUserId extends Partial<UserAttributes> {
  userId: number;
}

export class UserService {

    public static checkUserAttributes(user: UserAttributes): Promise<void> {
      if (!user || Object.keys(user).length === 0) {
        return Promise.reject({ message: 'Address missing!' });
      }
      if (user.userId) {
        return Promise.reject({ message: 'Cannot set the user Id of a new user!' });
      }
      return Promise.resolve();
    }

    public static cutUserInformation(user: UserAttributes): {userName: string, email: string, userId: number, picture: string} {
      return {
        userName: user.userName,
        email: user.email,
        userId: user.userId,
        picture: user.picture
      };
    }

    public static isAdmin(userId: number): Promise<void> {
      return User.findOne({
          where: {
              userId: userId,
          }
      }).then((user: UserAttributes) => {
        if (user.isAdmin) {
          return Promise.resolve();
        } else {
          return Promise.reject(new StatusError('Unauthorized', 401));
        }
      });
    }

    public static register(user: UserAttributes, address: AddressAttributes): Promise<User> {
        const saltRounds = 12;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password

        return UserService.checkUserAttributes(user).then(() => AddressService.checkAddressAttributes(address))
        .then(() => this.doesUserNotExistByUsernameEmail(user.userName, user.email))
        .then(() => AddressService.findOrCreateAddress(address))
        .then((existingAddress: Address) => this.insertUserWithExistingAddress(user, existingAddress.addressId))
        .then((createdUser: User) => this.getUserById(createdUser.userId));
    }

    private static insertUserWithExistingAddress(user: UserAttributes, addressId: number): Promise<User> {
      return User.create(
        Object.assign(user, {
          preference : {},
          addressId: addressId
        }),
        {
          include: [ User.associations.preference ]
        }
      );
    }

    public static login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        if (isLoginWithUserNameEmail(loginRequestee as LoginWithUsernameEmail)) {
          const loginRequesteeWithUsernameEmail: LoginWithUsernameEmail = loginRequestee as LoginWithUsernameEmail;
          return this.doesUserExistByUsernameEmail(loginRequesteeWithUsernameEmail.userName, loginRequesteeWithUsernameEmail.email)
          .then((existingUser: User) => {

            // compares the hash with the password from the lognin request
            if (bcrypt.compareSync(loginRequesteeWithUsernameEmail.password, existingUser.password)) {
                const token = new Token(existingUser.userName, existingUser.userId);
                return Promise.resolve({ user: existingUser, token: token.toString() });
            } else {
                return Promise.reject(new StatusError('Unauthorized', 401));
            }
          });
        } else if (isLoginWithToken(loginRequestee as LoginWithToken)) {
          const loginRequesteeWithToken: LoginWithToken = loginRequestee as LoginWithToken;
          return this.refreshLogin(loginRequesteeWithToken);
        } else {
          return Promise.reject(new StatusError('Login Request does not contain the necessary infromation!', 400));
        }
    }

    private static refreshLogin(loginRequestee: LoginWithToken): Promise<User> {
      return loginRequestee.token.verify()
      .then((decoded: DecodedToken) => this.doesUserExistById(decoded.userId))
      .then((user: User) => Promise.resolve(user));
    }

    private static getUserByEitherAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.or]: this.buildWhereOperator(attributes)
        },
        include: [
          User.associations.address
        ]
      });
    }

    private static getUserByAllAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.and]: this.buildWhereOperator(attributes)
        },
        include: [
          User.associations.address
        ]
      });
    }

    private static buildWhereOperator(attributes: Object): Array<Object> {
      return Object.entries(attributes).map(([key, value]) => {
        return {
          [key]: value
        };
      });
    }

    public static transerFee(orderSubType: OrderSubType<any, any>, checkedOrder: CO, transaction?: Transaction): Promise<[User, User]> {
      return OrderService.getOrderTotal(orderSubType, checkedOrder)
      .then((total: number) => Promise.all([
        checkedOrder.buyer.update(
          { wallet: checkedOrder.buyer.wallet - total },
          { transaction: transaction }
        ),
        checkedOrder.seller.update(
          { wallet: checkedOrder.seller.wallet + total },
          { transaction: transaction }
        )
      ]));
    }

    private static updateOnlyUser(user: HasUserId): Promise<void> {
      return User.update(user, {
        where: {
          userId: user.userId
        }
      }).then(() => Promise.resolve());
    }

  /************************************************
    Getters
  ************************************************/

    public static getUserById(userId: number): Promise<User> {
      return this.getUserByAllAttributes({
        userId: userId
      });
    }

    public static getCutUserById(userId: number): Promise<{userName: string, email: string, userId: number}> {
      return this.getUserById(userId)
      .then((user: User) => Promise.resolve(UserService.cutUserInformation(user)));
    }

    private static getUserByUsernameOrEmail(username: string, email: string): Promise<User> {
      return this.getUserByEitherAttributes({
        userName: username,
        email: email
      });
    }

    public static doesUserExistById(userId: number): Promise<User> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      });
    }

    public static doesUserNotExistById(userId: number): Promise<void> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userId: userId}, existingUser);
      });
    }

    public static doesUserExistByUsernameEmail(username: string, email: string): Promise<User> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      });
    }

    public static doesUserNotExistByUsernameEmail(username: string, email: string): Promise<void> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userName: username, email: email}, existingUser);
      });
    }

    private static handleUserShouldExist(user: User): Promise <User> {
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.reject({ message : 'No such User!'});
      }
    }

    private static handleUserShouldNotExist(attributes: any, existingUser: User): Promise <void> {
      if (existingUser) {
        if (attributes.userName && attributes.email) {
          if (attributes.email === existingUser.email && attributes.userName === existingUser.userName) {
            return Promise.reject(new StatusError('Username, Email already in use', 409));
          } else if (attributes.userName === existingUser.userName) {
            return Promise.reject(new StatusError('Username already in use', 409));
          } else {
            return Promise.reject(new StatusError('Email already in use', 409));
          }
        } else if (attributes.userId === existingUser.userId) {
          return Promise.reject(new StatusError('User already exists!', 409));
        } else {
          return Promise.reject(new StatusError('User already exists!', 409));
        }
      } else {
        return Promise.resolve();
      }
    }
}
