
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';

const serviceController: Router = express.Router();
const serviceService = new serviceService();

serviceController.post('/post-a-product',
    (req: Request, res: Response) => {
        serviceService.post(req.body).then(post => res.send(posted)).catch(err => res.status(500).send(err)); //not working because of post.service.ts
    }
);

export const ServiceController: Router = serviceController;