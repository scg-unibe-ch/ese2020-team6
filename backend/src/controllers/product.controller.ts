
import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/post',
    (req: Request, res: Response) => {
        productService.create(req.body).then((post: any) => res.send(post)).catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/buyProduct',
    (req: Request, res: Response) => {
        productService.getAll().then(product => res.send(product)).catch(err => res.status(500).send(err));
    }
);
productController.get('/productInformation::id',
    (req: Request, res: Response) => {
        const id: number = +req.params.id;
        productService.get(id).then((product: any) => res.send(product)).catch((err: any) => {
            console.log(err);
            res.status(500).send(err); });
    }
);




export const ProductController: Router = productController;
