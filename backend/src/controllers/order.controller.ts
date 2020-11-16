
import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { ProductAttributes } from '../models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import {OrderService} from '../services/order.service';
import { OrderAttributes } from '../models/order.model';

const orderController: Router = express.Router();
const orderService = new OrderService();

 orderController.put('/product/item/buy', verifyToken,
 (req: Request, res: Response) => {
     const productId: number = parseInt(req.params.productId, 10);
     const userId: number = parseInt(req.params.userId, 10);
     const paymentMethod: string = req.params.paymentMethod;
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


// test
