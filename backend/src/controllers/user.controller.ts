import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken, checkForAuth } from '../middlewares/checkAuth';
import { User } from '../models/user.model';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then((registeredUser: User) => res.send(registeredUser)).catch(err => {
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
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/userid::userId', checkForAuth,
  (req: Request, res: Response, next) => {
    userService.getUserById(parseInt(req.params.userId, 10)).then(user => {
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
    }).catch(err => res.status(500).send(err));
  }
);

userController.get('/',
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

export const UserController: Router = userController;
