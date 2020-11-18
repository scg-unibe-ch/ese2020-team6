import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { PreferenceController } from './preference.controller';
import { verifyToken, checkForAuth } from '../middlewares/checkAuth';
import { UserAttributes, User } from '../models/user.model';
import { AddressAttributes, Address } from '../models/address.model';

const userController: Router = express.Router();

userController.post('/register',
    (req: Request, res: Response) => {

      const user: UserAttributes = req.body as UserAttributes;
      const address: AddressAttributes = req.body.address as AddressAttributes;

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
