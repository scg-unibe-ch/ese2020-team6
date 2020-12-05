import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { PreferenceController } from './preference.controller';
import { checkForAuth } from '../middlewares/checkAuth';
import { UserAttributes, User } from '../models/user.model';
import { AddressAttributes } from '../models/address.model';
import { Token } from '../interfaces/token.interface';
import { savePicture } from '../middlewares/multer';

const userController: Router = express.Router();

userController.post('/register', savePicture.single('picture'),
    (req: any, res: Response) => {
      req.body.address = JSON.parse(req.body.address);
      req.body.picture = req.file.path;
      const user: UserAttributes = req.body;
      const address: AddressAttributes = req.body.address;
        UserService.register(user, address).then((registeredUser: User) => res.send(registeredUser)).catch((err: any) => {
          if (err.status) {
            res.status(err.status);
          } else {
            res.status(500);
          }
          res.send(err);
        });
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        req.body.token = new Token(req.headers.authorization);
        UserService.login(req.body).then(login => res.send(login)).catch((err: any) => res.status(500).send(err));
    }
);

userController.get('/userid/:userId', checkForAuth,
  (req: Request, res: Response, next) => {
    UserService.getUserById(parseInt(req.params.userId, 10)).then((user: UserAttributes) => {
      const tokenPayload = req.body.tokenPayload;
      if (tokenPayload) {
        if (tokenPayload.userId === user.userId) {
          res.send(user);
        } else {
          res.send(UserService.cutUserInformation(user));
        }
      } else {
        res.send(UserService.cutUserInformation(user));
      }
    }).catch((err: any) => res.status(500).send(err));
  }
);

userController.use('/preference', PreferenceController);

export const UserController: Router = userController;
