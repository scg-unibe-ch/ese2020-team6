import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
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

    public register(user: UserAttributes): Promise<User> {
        const saltRounds = 12;
        const userCopy: any = user as any;
        delete userCopy.repeatPassword;
        user = userCopy as UserAttributes;

        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password
        return User.findOrCreate({
          where: {
            [Op.or]: [
              {
                userName: user.userName
              },
              {
                email: user.email
              }
            ]
          },
          defaults: user
        }).then((result: [User, boolean]) => {
          const success: boolean = result[1];
          const registeredUser: User = result[0];
          if (success) {
            return Promise.resolve(registeredUser);
          } else {
            if (user.email === registeredUser.email && user.userName === registeredUser.userName) {
              return Promise.reject({ message: 'Username, Email already in use', status: 409 });
            } else if (user.userName === registeredUser.userName) {
              return Promise.reject({ message: 'Username already in use', status: 409 });
            } else {
              return Promise.reject({ message: 'Email already in use', status: 409 });
            }
          }
        }).catch(err => Promise.reject(err));
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
        }
      });
    }

}
