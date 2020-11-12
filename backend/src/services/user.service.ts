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

        const checkIfUserDoesNotExist: Promise<void> = this.userDoesNotExist(user);
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

        let queryKey: string;
        if (loginRequestee.isUsername) {
          queryKey = 'userName';
        } else {
          queryKey = 'email';
        }


        return User.findOne({
            where: {
                [queryKey]: loginRequestee.queryValue
            }
        })
        .then(user => {
            if (user == null) {
              return Promise.reject({ message: 'No such user' });
            }
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'Not authorized' });
            }
        })
        .catch(err => Promise.reject(err));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }

    public getUserById(id: number): Promise<User> {
      return User.findOne({
        where: {
          userId: id
        },
        include: [{
          association: User.Preference
        },
        {
          association: User.Address
        }]
      });
    }

    public getUserByUsernameOrEmail(user: UserAttributes): Promise<User> {
      return User.findOne({
        where: {
          [Op.or]: [
            {
              userName: user.userName
            },
            {
              email: user.email
            }
          ]
        }
      });
    }

    public userDoesNotExist(user: UserAttributes): Promise<void> {
      return this.getUserByUsernameOrEmail(user).then((existingUser: User) => {
        if (existingUser) {
          if (user.email === existingUser.email && user.userName === existingUser.userName) {
            return Promise.reject({ message: 'Username, Email already in use', status: 409 });
          } else if (user.userName === existingUser.userName) {
            return Promise.reject({ message: 'Username already in use', status: 409 });
          } else {
            return Promise.reject({ message: 'Email already in use', status: 409 });
          }
        } else {
          return Promise.resolve();
        }
      }).catch(err => Promise.reject(err));
    }
}
