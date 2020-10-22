
import express, { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { verifyToken, checkIsAdmin } from '../middlewares/checkAuth';
import { Products, ProductsAttributes } from '../models/products.model';

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

productController.delete('/delete::id',
    (req: Request, res: Response) => {
        const id: number = +req.params.id;
        productService.delete(id).then(
            product => res.send(product)).catch(err => res.status(500).send(err));
    }
);

productController.get('/accepted',
  (req: Request, res: Response) => {
    productService.getAllAccepted()
    .then((products: ProductsAttributes[]) => res.send(products)).catch((err: any) => res.status(500).send(err));
  }
);

productController.get('/unreviewed', verifyToken, checkIsAdmin,
  (req: Request, res: Response) => {
    productService.getAllUnreviewed()
    .then((products: ProductsAttributes[]) => res.send(products)).catch((err: any) => res.status(500).send(err));
  }
);

productController.put('/accept/:productId', verifyToken, checkIsAdmin,
  (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.productId, 10);
    productService.accept(productId).then(value => res.send(value)).catch((err: any) => res.status(500).send(err));
  }
);

productController.put('/reject/:productid', verifyToken, checkIsAdmin,
  (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.productId, 10);
    const rejectionMessage: string = req.body.rejectionMessage;
    productService.reject(productId, rejectionMessage).then(value => res.send(value)).catch((err: any) => res.status(500).send(err));
  }
);


export const ProductController: Router = productController;
