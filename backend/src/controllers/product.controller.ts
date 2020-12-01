import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { ProductAttributes } from '../models/product.model';
import { AddressAttributes } from '../models/address.model';
import { CategoryController } from './category.controller';
import { OrderController } from './order.controller';

const productController: Router = express.Router();


// multer for saving image
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req: Request, file: any, cb: any) {

        cb(null, 'assets');
    },
    filename: function(req: Request, file: any, cb: any) {
        cb(null, new Date().toISOString() + file.fieldname);
    }
});
const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpeg') {
            cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

productController.post('/post', upload.single('picture'), verifyToken ,
    (req: any, res: Response) => {
        req.body.sellerId = req.body.tokenPayload.userId;
        req.body.address = JSON.parse(req.body.address);
        req.body.picture = req.file.path;
        const product: ProductAttributes = req.body;
        const address: AddressAttributes = req.body.address;
        ProductService.createProduct(product, address)
        .then((postedProduct: ProductAttributes) => res.send(postedProduct))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/all', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        ProductService.getAllProducts()
        .then((products: Array<ProductAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/details/:productId',
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        ProductService.getProductById(productId)
        .then((product: ProductAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.delete('/delete/:productId', verifyToken,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        const userId: number = req.body.tokenPayload.userId;
        ProductService.deleteProduct(productId, userId)
        .then((product: ProductAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/unreviewed', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        ProductService.getAllUnreviewedProducts()
        .then((products: Array<ProductAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/accepted',
    (req: Request, res: Response) => {
        ProductService.getAllAcceptedProducts()
        .then((products: Array<ProductAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.put('/accept/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        ProductService.acceptProduct(productId)
        .then((product: ProductAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.put('/reject/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const rejectionMessage: string = req.body.rejectionMessage;
        const productId: number = parseInt(req.params.productId, 10);
        ProductService.rejectProduct(productId, rejectionMessage)
        .then((product: ProductAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.put('/update/:productId', upload.single('picture'), verifyToken ,
    (req: any, res: Response) => {
        req.body.productId = parseInt(req.params.productId, 10);
        console.log(req);
        req.body.picture = req.file.path;
        const product: ProductAttributes = req.body;
        const address: AddressAttributes = req.body.address;
        ProductService.updateProduct(product, address)
        .then((updatedProduct: ProductAttributes) => res.send(updatedProduct))
        .catch((err: any) => res.status(500).send(err));
    });

 productController.get('/myproducts/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        ProductService.getMyProducts(userId)
        .then((products: Array<ProductAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }
);

    productController.get('/unreviewd/count', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        ProductService.getUnreviewdProductsCount()
        .then((amountOfUnreviewd: number) => res.send({amountOfUnreviewd: amountOfUnreviewd}))
        .catch((err: any) => res.status(500).send(err));
    }

);

    productController.get('/rejected/count/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        ProductService.getMyRejectedProductsCount(userId)
        .then((amountOfRejected: number) => res.send({amountOfRejected: amountOfRejected}))
        .catch((err: any) => res.status(500).send(err));
    }

);

    productController.get('/rejected/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        ProductService.getMyRejectedProducts(userId)
        .then((products: Array<ProductAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }

);

productController.use('/order', OrderController);
productController.use('/category', CategoryController);

export const ProductController: Router = productController;
