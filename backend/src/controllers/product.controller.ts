
import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/product/post',
    (req: Request, res: Response) => {
        productService.create(req.body).then((post: any) => res.send(post)).catch((err: any) => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
