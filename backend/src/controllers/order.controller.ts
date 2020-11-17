
import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { AddressService } from '../services/address.service';
import { ProductAttributes } from '../models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import {OrderService} from '../services/order.service';
import { OrderAttributes } from '../models/order.model';

const productService = new ProductService();
const userService = new UserService();
const addressService = new AddressService();
const orderController: Router = express.Router();
const orderService = new OrderService();

 orderController.put('/product/item/buy', verifyToken,
 (req: Request, res: Response) => {
     const productId: number = parseInt(req.params.productId, 10);
     const userId: number = parseInt(req.params.userId, 10);
     const paymentMethod = 'wallet'; // because no Paypal yet
     const shipping: string = req.params.shipping;
     orderService.buyItem(productId, paymentMethod, shipping, userId)
     .then(() => res.send()) // output ergänzen
     .catch((err: any) => res.status(500).send(err));
   }
);

orderController.get( '/order/buyer/:userId', verifyToken,
 (req: Request, res: Response) => {
     const userId: number = parseInt(req.params.userId, 10);
     orderService.getMyOrders(userId)
     .then((orders: Array<OrderAttributes>) => res.send(orders))
     .catch((err: any) => res.status(500).send(err));
    }
);

orderController.get( '/order/seller/:userId', verifyToken,
 (req: Request, res: Response) => {
     const userId: number = parseInt(req.params.userId, 10);
     orderService.getMyProductOrders(userId)
     .then((orders: Array<OrderAttributes>) => res.send(orders))
     .catch((err: any) => res.status(500).send(err));
    }
);



// Remove the implementations below, if you would like to implement the actual method
// The returned response should look like below

orderController.get('/buyer', verifyToken,
  (req: Request, res: Response) => {
    userService.getUserById(req.body.tokenPayload.userId).then((buyer) => {

      userService.getCutUserById(2).then((seller) => {

        AddressService.getAddressById(1).then((shippingAddress => {
          productService.getProductById(1).then(product => {

            res.send([{
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              shippingAddress: shippingAddress,
              orderId: 1,
              paymentMethod: 'Wallet',
              hours: 10
            }, {
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              shippingAddress: shippingAddress,
              orderId: 1,
              paymentMethod: 'Wallet',
            }, {
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              shippingAddress: shippingAddress,
              orderId: 1,
              paymentMethod: 'Wallet'
            }, {
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              orderId: 1,
              hours: 5,
              paymentMethod: 'Wallet'
            }, {
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              shippingAddress: shippingAddress,
              orderId: 1,
              paymentMethod: 'Wallet'
            }]);
          });
        }));
      });
    });
  }
);

orderController.get('/seller', verifyToken,
  (req: Request, res: Response) => {
    userService.getUserById(req.body.tokenPayload.userId).then((seller) => {

      userService.getCutUserById(2).then((buyer) => {

        AddressService.getAddressById(1).then((shippingAddress => {
          productService.getProductById(1).then(product => {

            res.send([{
              buyerId: buyer.userId,
              buyer: buyer,
              sellerId: seller.userId,
              seller: seller,
              productId: product.productId,
              product: product,
              shippingAddress: shippingAddress,
              orderId: 1
            }]);
          });
        }));
      });
    });
  }
);

export const OrderController: Router = orderController;
