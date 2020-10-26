import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Products } from '../models/products.model';
import { any } from 'sequelize/types/lib/operators';

export class UserService {
  datas: any;

    public static cutUserInformation(user: User): {userName: string, email: string, userId: number} {
      return {
        userName: user.userName,
        email: user.email,
        userId: user.userId
      };
    }

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        try {
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
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
              return Promise.reject('No such user');
            }
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject('Not authorized');
            }
        })
        .catch(err => Promise.reject({ message: err }));
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
