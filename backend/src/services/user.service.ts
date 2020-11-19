import { Sequelize } from 'sequelize';
import { UserAttributes, User } from '../models/user.model';
import { AddressAttributes, Address } from '../models/address.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
import { AddressService } from './address.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Op } = require('sequelize');

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

    public static cutUserInformation(user: UserAttributes): {userName: string, email: string, userId: number} {
      return {
        userName: user.userName,
        email: user.email,
        userId: user.userId
      };
    }

    public static register(user: UserAttributes, address: AddressAttributes): Promise<User> {
        const saltRounds = 12;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password

        const checkIfUserDoesNotExist: Promise<void> = this.doesUserNotExistByUsernameEmail(user.userName, user.email);
        const checkIfAddressDoesExist: Promise<number> = AddressService.addressDoesExist(address);

        return UserService.checkUserAttributes(user).then(() => {
          return AddressService.checkAddressAttributes(address).then(() => {
            return checkIfUserDoesNotExist.then(() => { // user does not exist yet -> insert
              return checkIfAddressDoesExist.then((addressId: number) => { // address does exist -> only insert new user
                return this.insertUserWithExistingAddress(user, addressId).then((createdUser: User) => {
                  return this.getUserById(createdUser.userId);
                }).catch((err: any) => Promise.reject(err));
              }).catch(() => { // address does not exist -> insert user and address
                return this.insertUserAndAddress(user, address).then().catch();
              });
            }).catch((err: any) => Promise.reject(err)); // user does already exist -> reject
          }).catch((err: any) => Promise.reject(err));
        }).catch((err: any) => Promise.reject(err));
    }

    private static insertUserAndAddress(user: UserAttributes, address: AddressAttributes): Promise<User> {
      return User.create(
        Object.assign(user, {address: address, preference: {}}),
        {
          include: [{
            association: User.associations.preference
          },
          {
            association: User.associations.address,
            include : [ Address.associations.users ]
          }]
        }
      );
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
        const secret = process.env.JWT_SECRET;

        return this.doesUserExistByUsernameEmail(loginRequestee.userName, loginRequestee.email).then((existingUser: User) => {
          // compares the hash with the password from the lognin request
          if (bcrypt.compareSync(loginRequestee.password, existingUser.password)) {
              const token: string = jwt.sign({ userName: existingUser.userName, userId: existingUser.userId }, secret, { expiresIn: '2h' });
              return Promise.resolve({ user: existingUser, token });
          } else {
              return Promise.reject({ message: 'Not authorized' });
          }
        }).catch((err: any) => Promise.reject(err));
    }

    private static getUserByEitherAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.or]: this.buildWhereOperator(attributes)
        },
        include: Object.values(User.associations)
      });
    }

    private static getUserByAllAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.and]: this.buildWhereOperator(attributes)
        },
        include: Object.values(User.associations)
      });
    }

    private static buildWhereOperator(attributes: Object): Array<Object> {
      return Object.entries(attributes).map(([key, value]) => {
        return {
          [key]: value
        };
      });
    }

    public static transerFee(buyerId: number, sellerId: number, price: number): Promise<void> {
      return Promise.all([
        this.getUserById(buyerId).then((buyer: User) => {
          return this.updateOnlyUser({userId: buyerId, wallet: -buyer.wallet});
        }).catch((err: any) => Promise.reject(err)),
        this.getUserById(sellerId).then((seller: User) => {
          return this.updateOnlyUser({userId: sellerId, wallet: seller.wallet});
        }).catch((err: any) => Promise.reject(err))
      ]).then(() => Promise.resolve()).catch((err: any) => Promise.reject(err));
    }

    private static updateOnlyUser(user: HasUserId): Promise<void> {
      return User.update(user, {
        where: {
          userId: user.userId
        }
      }).then(() => Promise.resolve()).catch((err: any) => Promise.reject(err));
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
      .then((user: User) => Promise.resolve(UserService.cutUserInformation(user)))
      .catch((err: any) => Promise.reject(err));
    }

    private static getUserByUsernameOrEmail(username: string, email: string): Promise<User> {
      return this.getUserByEitherAttributes({
        userName: username,
        email: email
      });
    }

    private static doesUserExistById(userId: number): Promise<User> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      }).catch((err: any) => this.handleError(err));
    }

    private static doesUserNotExistById(userId: number): Promise<void> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userId: userId}, existingUser);
      }).catch((err: any) => this.handleError(err));
    }

    private static doesUserExistByUsernameEmail(username: string, email: string): Promise<User> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      }).catch((err: any) => this.handleError(err));
    }

    private static doesUserNotExistByUsernameEmail(username: string, email: string): Promise<void> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userName: username, email: email}, existingUser);
      }).catch((err: any) => this.handleError(err));
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
            return Promise.reject({ message: 'Username, Email already in use', status: 409 });
          } else if (attributes.userName === existingUser.userName) {
            return Promise.reject({ message: 'Username already in use', status: 409 });
          } else {
            return Promise.reject({ message: 'Email already in use', status: 409 });
          }
        } else if (attributes.userId === existingUser.userId) {
          return Promise.reject({ message: 'User already exists!', status: 409 });
        } else {
          return Promise.reject({ message: 'User already exists!', status: 409 });
        }
      } else {
        return Promise.resolve();
      }
    }

    private static handleError(err: any): Promise <any> {
      return Promise.reject(err);
    }
}
