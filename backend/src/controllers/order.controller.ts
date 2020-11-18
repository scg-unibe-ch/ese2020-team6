
import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { AddressService } from '../services/address.service';
import { ProductAttributes } from '../models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';
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

orderController.get('/buyer', verifyToken,
  (req: Request, res: Response) => {
    const buyerId: number = req.body.tokenPayload.userId;
    orderService.getMyOrders(buyerId).then((orders: Array<OrderAttributes>) => res.send(orders))
    .catch(err => res.status(500).send(err));
  }
);

orderController.get('/seller', verifyToken,
  (req: Request, res: Response) => {
    const sellerId: number = req.body.tokenPayload.userId;
    orderService.getMyProductOrders(sellerId).then((orders: Array<OrderAttributes>) => res.send(orders))
    .catch(err => res.status(500).send(err));
  }
);

export const OrderController: Router = orderController;
