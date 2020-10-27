
// import { RSA_NO_PADDING } from 'constants';
import express, { Router, Request, Response } from 'express';
// import { request } from 'http';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { ProductsAttributes } from '../models/products.model';

const productController: Router = express.Router();
const productService = new ProductService();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req: Request, file: any, cd: any) {
        cd(null, '../public/images');
    },
    filename: function(req: Request, file: any, cd: any) {
        cd(null, new Date().toISOString() + file.filename);
    }
});

const fileFilter = (req: Request, file: any, cd: any) => {
    if (file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/pdf') {
            cd(null, true);
    } else {
        cd(new Error('wrong format for Picture'), false);
    }
    console.log(req);

};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

productController.post('/post', verifyToken,
    (req: Request, res: Response) => {
        const postProduct: ProductsAttributes = req.body;
        productService.createProduct(postProduct)
        .then((postedProduct: ProductsAttributes) => res.send(postedProduct))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.get('/all', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        productService.getAllProducts()
        .then((products: Array<ProductsAttributes>) => res.send(products))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/details/:productId',
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        productService.getProductById(productId)
        .then((product: ProductsAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    }
);

productController.delete('/delete/:productId', verifyToken,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        productService.deleteProduct(productId)
        .then((product: ProductsAttributes) => res.send(product))
        .catch(err => res.status(500).send(err));
    }
);

productController.get('/unreviewed', verifyToken, verifyIsAdmin,
(   req: Request, res: Response) => {
        productService.getAllUnreviewedProducts()
    .then((products: Array<ProductsAttributes>) => res.send(products))
    .catch((err: any) => res.status(500).send(err));
});

productController.get('/accepted',
    (req: Request, res: Response) => {
        productService.getAllAcceptedProducts()
        .then((products: Array<ProductsAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    });

productController.put('/accept/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        productService.acceptProduct(productId)
        .then((product: ProductsAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
});

productController.put('/reject/:productId', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        const rejectionMessage: string = req.body.rejectionMessage;
        const productId: number = parseInt(req.params.productId, 10);
        productService.rejectProduct(productId, rejectionMessage)
        .then((product: ProductsAttributes) => res.send(product))
        .catch((err: any) => res.status(500).send(err));
    });

interface MulterRequest extends Request {
  file: any;
}

productController.put('/update/:productId', verifyToken,
    (req: MulterRequest, res: Response) => {
        const updateProduct: ProductsAttributes = req.body;
        productService.updateProduct(updateProduct)
        .then((updatedProduct: ProductsAttributes) => res.send(updatedProduct))
        .catch((err: any) => res.status(500).send(err));
    });

 productController.get('/myproducts/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        productService.getMyProducts(userId)
        .then((products: Array<ProductsAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }
);

    productController.get('/unreviewd/count', verifyToken, verifyIsAdmin,
    (req: Request, res: Response) => {
        productService.getUnreviewdProductsCount()
        .then((amountOfUnreviewd: number) => res.send({amountOfUnreviewd: amountOfUnreviewd}))
        .catch((err: any) => res.status(500).send(err));
    }

);

    productController.get('/rejected/count/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        productService.getMyRejectedProductsCount(userId)
        .then((amountOfRejected: number) => res.send({amountOfRejected: amountOfRejected}))
        .catch((err: any) => res.status(500).send(err));
    }

    );

    productController.get('/rejected/:userId', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.userId, 10);
        productService.getMyRejectedProducts(userId)
        .then((products: Array<ProductsAttributes>) => res.send(products))
        .catch((err: any) => res.status(500).send(err));
    }

    );
export const ProductController: Router = productController;
