import { ProductController } from './product.controller';

import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.status(500).send(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.status(500).send(err));
    }
);

userController.get('/userid::userId', verifyToken,
  (req: Request, res: Response) => {
    userService.getUserById(parseInt(req.params.userId, 10)).then(user => res.send(user)).catch(err => res.status(500).send(err));
  }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/profile/myproducts::id',
    (req: Request, res: Response) => {
        const id: number = +req.params.id;
        userService.getMyProducts(id).then((product: any) => res.send(product)).catch((err: any) => {
            console.log(err);
            res.status(500).send(err); });
    }
);

export const UserController: Router = userController;
