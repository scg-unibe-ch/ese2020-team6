import express, { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { ItemSold } from '../models/item-sold.model';
import { ItemRented } from '../models/item-rented.model';
import { ServiceRented } from '../models/service-rented.model';
import { AddressAttributes } from '../models/address.model';

import { handleError } from '../errors/status.error';

const orderController: Router = express.Router();
orderController.use(verifyToken);

orderController.put('/item/buy',
 (req: Request, res: Response) => {
     req.body.paymentMethod = 'wallet';

     const buyerId: number = req.body.tokenPayload.userId;
     const productId: number = req.body.productId;
     const paymentMethod: string = req.body.paymentMethod;
     const shippingAddress: AddressAttributes = req.body.shippingAddress as AddressAttributes;

     OrderService.buyItem(buyerId, productId, paymentMethod, shippingAddress)
       .then((itemSold: ItemSold) => res.send(itemSold)) // output ergänzen
       .catch((err: any) => handleError(err, res));
   }
);

orderController.put('/item/rent',
    (req: Request, res: Response) => {
      req.body.paymentMethod = 'wallet';

      const buyerId: number = req.body.tokenPayload.userId;
      const productId: number = req.body.productId;
      const paymentMethod: string = req.body.paymentMethod;
      const hours: number = req.body.hours;
      const shippingAddress: AddressAttributes = req.body.shippingAddress as AddressAttributes;

      OrderService.rentItem(buyerId, productId, paymentMethod, shippingAddress, hours)
        .then((itemRented: ItemRented) => res.send(itemRented)) // output ergänzen
        .catch((err: any) => handleError(err, res));
});

orderController.put('/service/rent',
    (req: Request, res: Response) => {

      const buyerId: number = req.body.tokenPayload.userId;
      const productId: number = req.body.productId;
      const paymentMethod: string = req.body.paymentMethod;
      const hours: number = req.body.hours;

      OrderService.rentService(buyerId, productId, paymentMethod, hours)
        .then((serviceRented: ServiceRented) => res.send(serviceRented)) // output ergänzen
        .catch((err: any) => handleError(err, res));
});

orderController.get('/buyer',
  (req: Request, res: Response) => {
    const buyerId: number = req.body.tokenPayload.userId;
    OrderService.getMyOrders(buyerId).then((orders: Array<Order>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

orderController.get('/seller',
  (req: Request, res: Response) => {
    const sellerId: number = req.body.tokenPayload.userId;
    OrderService.getMyProductOrders(sellerId).then((orders: Array<Order>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

export const OrderController: Router = orderController;
