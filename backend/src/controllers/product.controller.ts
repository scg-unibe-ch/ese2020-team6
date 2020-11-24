import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { ProductAttributes } from '../models/product.model';
import { AddressAttributes, Address } from '../models/address.model';
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

// extract address from form
function convertAddress(form: any): any {
    const addressObject = {
        'streetName': form.streetName,
        'streetType': form.streetType,
        'addressNumber': form.addressNumber,
        'city': form.city,
        'country': form.country,
        'neighbourhood': form.neighbourhood,
        'postal': form.postal,
        'region': form.region,
        'streetAddress': form.streetAddress
    };
    return addressObject;
}
// extract product from form
function convertProduct(form: any, seller: number): any {
    const data = {
        'category': form.category,
        'description': form.description,
        'expirationDate': form.expirationDate,
        'isDeliverable': form.isDeliverable,
        'offerType': form.offerType,
        'price': form.price,
        'productType': form.productType,
        'subcategory': form.subcategory,
        'title': form.title,
        'sellerId': seller
    };
    return data;
}

productController.post('/post', upload.single('picture'), verifyToken ,
    (req: any, res: Response) => {
        console.log(req.file, 'imaaaaaaaaaaaaaaaaaaaaaaaageeeeeeeeeeeeee');
        console.log(req.body, 'heeelllllllllllllllllllllllllllloooooooooooooooooo');
        const product: ProductAttributes = convertProduct(req.body, req.body.tokenPayload.userId);
        const address: AddressAttributes = convertAddress(req.body);
        const picture: string = req.file.path;
        ProductService.createProduct(product, address, picture)
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
(   req: Request, res: Response) => {
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

interface MulterRequest extends Request {
  file: any;
}

productController.put('/update/:productId', verifyToken,
    (req: MulterRequest, res: Response) => {
      req.body.productId = parseInt(req.params.productId, 10);
      const product: ProductAttributes = req.body as ProductAttributes;
      const address: AddressAttributes = req.body.address as AddressAttributes;

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
