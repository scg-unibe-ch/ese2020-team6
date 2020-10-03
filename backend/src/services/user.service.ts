import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../interfaces/login.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        console.log('Stone 1');
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            if (user == null) {
                console.log('Stone Username');
              return Promise.reject('no such user');
            }

            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the lognin request
                console.log('Stone passwort');
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                console.log('Stone last');
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
