
import { RSA_NO_PADDING } from 'constants';
import express, { Router, Request, Response } from 'express';
import { request } from 'http';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { Products, ProductsAttributes } from '../models/products.model';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/post',
    (req: Request, res: Response) => {
        productService.createProduct(req.body)
        .then((post: any) => res.send(post))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/all', verifyToken,
    (req: Request, res: Response) => {
        productService.getAllProducts()
        .then(product => res.send(product))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/details/:prouctId',
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        productService.getProductById(productId)
        .then((product: any) => res.send(product))
        .catch((err: any) => {
            console.log(err);
            res.status(500).send(err); });
    }
);

productController.delete('/delete/:productId', verifyToken,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        productService.deleteProduct(productId)
        .then(product => res.send(product))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/unreviewed', verifyToken, verifyIsAdmin,
(   req: Request, res: Response) => {
        productService.getAllUnreviewedProducts()
    .then((products: any) => res.send(products))
    .catch((err: any) => res.status(500).send(err));
});

productController.get('/acctepted', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        productService.getAllAcceptedProducts()
        .then((products: any) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    });

productController.put('/accept/:productId', verifyToken, verifyIsAdmin,
(req: Request, res: Response) => {
    const productId: number = parseInt(req.params.productId, 10);
    productService.acceptProduct(productId)
    .then((products: any) => res.send(products))
    .catch((err: any) => res.status(500).send(err));
});

productController.put('/reject/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const rejectionMessage: string = req.params.rejectionMessage;
        const productId: number = parseInt(req.params.productId, 10);
        productService.rejectProduct(productId, rejectionMessage)
        .then((products: any) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    });

productController.put('/update/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const product: ProductsAttributes = req.body.product;
        productService.updateProduct(product)
        .then((products: any) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    });

 productController.get('/myproducts/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        productService.getMyProducts(userId)
        .then((product: any) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

export const ProductController: Router = productController;
