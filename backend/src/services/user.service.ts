import { UserAttributes, User } from '../models/user.model';
import { AddressAttributes, Address } from '../models/address.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
import { AddressService } from './address.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const { Op } = require('sequelize');

export class UserService {
  datas: any;

    public static cutUserInformation(user: User): {userName: string, email: string, userId: number} {
      return {
        userName: user.userName,
        email: user.email,
        userId: user.userId
      };
    }

    public register(user: UserAttributes, address: AddressAttributes): Promise<User> {
        const saltRounds = 12;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password

        const checkIfUserDoesNotExist: Promise<void> = this.doesUserNotExistByUsernameEmail(user.userName, user.email);
        const checkIfAddressDoesExist: Promise<number> = AddressService.addressDoesExist(address);

        return checkIfUserDoesNotExist.then(() => { // user does not exist yet -> insert
          return checkIfAddressDoesExist.then((addressId: number) => { // address does exist -> only insert new user
            return this.insertUserWithExistingAddress(user, addressId);
          }).catch(() => { // address does not exist -> insert user and address
            return this.insertUserAndAddress(user, address);
          });
        }).catch(err => Promise.reject(err)); // user does already exist -> reject
    }

    private insertUserAndAddress(user: UserAttributes, address: AddressAttributes): Promise<User> {
      return User.create(
        Object.assign(user, {address: address, preference: {}}),
        {
          include: [{
            association: User.Preference
          },
          {
            association: User.Address,
            include : [ Address.Users ]
          }]
        }
      ).then((createdUser: User) => Promise.resolve(createdUser)).catch(err => Promise.reject(err));
    }

    private insertUserWithExistingAddress(user: UserAttributes, addressId: number): Promise<User> {
      return User.create(
        Object.assign(user, {
          preference : {},
          addressId: addressId
        }),
        {
          include: [{
            association: User.Preference
          }]
        }
      ).then((createdUser: User) => Promise.resolve(createdUser)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;

        return this.doesUserExistByUsernameEmail(loginRequestee.userName, loginRequestee.email).then((existingUser: User) => {
          // compares the hash with the password from the lognin request
          if (bcrypt.compareSync(loginRequestee.password, existingUser.password)) {
              const token: string = jwt.sign({ userName: existingUser.userName, userId: existingUser.userId }, secret, { expiresIn: '2h' });
              return Promise.resolve({ user: existingUser, token });
          } else {
              return Promise.reject({ message: 'Not authorized' });
          }
        }).catch(err => Promise.reject(err));
    }

    private getUserByEitherAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.or]: this.buildWhereOperator(attributes)
        },
        include: [{
          association: User.Preference
        },
        {
          association: User.Address
        }]
      });
    }

    private getUserByAllAttributes(attributes: Object): Promise<User> {
      return User.findOne({
        where: {
          [Op.and]: this.buildWhereOperator(attributes)
        },
        include: [{
          association: User.Preference
        },
        {
          association: User.Address
        }]
      });
    }

    private buildWhereOperator(attributes: Object): Array<Object> {
      return Object.entries(attributes).map(([key, value]) => {
        return {
          [key]: value
        };
      });
    }

    public getUserById(userId: number): Promise<User> {
      return this.getUserByAllAttributes({
        userId: userId
      });
    }

    private getUserByUsernameOrEmail(username: string, email: string): Promise<User> {
      return this.getUserByEitherAttributes({
        userName: username,
        email: email
      });
    }

    private doesUserExistById(userId: number): Promise<User> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      }).catch(err => this.handleError(err));
    }

    private doesUserNotExistById(userId: number): Promise<void> {
      return this.getUserById(userId).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userId: userId}, existingUser);
      }).catch(err => this.handleError(err));
    }

    private doesUserExistByUsernameEmail(username: string, email: string): Promise<User> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldExist(existingUser);
      }).catch(err => this.handleError(err));
    }

    private doesUserNotExistByUsernameEmail(username: string, email: string): Promise<void> {
      return this.getUserByUsernameOrEmail(username, email).then((existingUser: User) => {
        return this.handleUserShouldNotExist({userName: username, email: email}, existingUser);
      }).catch(err => this.handleError(err));
    }

    private handleUserShouldExist(user: User): Promise <User> {
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.reject({ message : 'No such User!'});
      }
    }

    private handleUserShouldNotExist(attributes: any, existingUser: User): Promise <void> {
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

    private handleError(err: any): Promise <any> {
      return Promise.reject(err);
    }
}
