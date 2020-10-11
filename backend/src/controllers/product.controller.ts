
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';

const productController: Router = express.Router();
const productService = new productService();

productController.post('/post-a-product',
    (req: Request, res: Response) => {
        productService.post(req.body).then(post => res.send(posted)).catch(err => res.status(500).send(err)); //not working because of post.service.ts
    }
);

export const ProductController: Router = productController;