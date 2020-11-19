import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';

import { OrderService } from '../services/order.service';

import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes } from '../models/service-rented.model';
import { Address, AddressAttributes } from '../models/address.model';

const orderController: Router = express.Router();

 orderController.put('/item/buy', verifyToken,
 (req: Request, res: Response) => {
     req.body.paymentMethod = 'wallet';

     const buyerId: number = req.body.tokenPayload.userId;
     const sellerId: number = req.body.sellerId;
     const productId: number = req.body.productId;
     const paymentMethod: string = req.body.paymentMethod;
     const shippingAddress: AddressAttributes = req.body.shippingAddress as AddressAttributes;

     OrderService.buyItem(buyerId, sellerId, productId, paymentMethod, shippingAddress)
       .then(() => res.send()) // output ergänzen
       .catch((err: any) => res.status(500).send(err));
   }
);

orderController.put('/item/rent', verifyToken,
    (req: Request, res: Response) => {
      req.body.paymentMethod = 'wallet';

      const buyerId: number = req.body.tokenPayload.userId;
      const sellerId: number = req.body.sellerId;
      const productId: number = req.body.productId;
      const paymentMethod: string = req.body.paymentMethod;
      const hours: number = req.body.hours;
      const shippingAddress: AddressAttributes = req.body.shippingAddress as AddressAttributes;

      OrderService.rentItem(buyerId, sellerId, productId, paymentMethod, shippingAddress, hours)
        .then(() => res.send()) // output ergänzen
        .catch((err: any) => res.status(500).send(err));
});

orderController.put('/service/rent', verifyToken,
    (req: Request, res: Response) => {
      const buyerId: number = req.body.tokenPayload.userId;
      const sellerId: number = req.body.sellerId;
      const productId: number = req.body.productId;
      const paymentMethod: string = req.body.paymentMethod;
      const hours: number = req.body.hours;

      OrderService.rentService(buyerId, sellerId, productId, paymentMethod, hours)
        .then(() => res.send()) // output ergänzen
        .catch((err: any) => res.status(500).send(err));
});

orderController.get('/buyer', verifyToken,
  (req: Request, res: Response) => {
    const buyerId: number = req.body.tokenPayload.userId;
    OrderService.getMyOrders(buyerId).then((orders: Array<Order>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

orderController.get('/seller', verifyToken,
  (req: Request, res: Response) => {
    const sellerId: number = req.body.tokenPayload.userId;
    OrderService.getMyProductOrders(sellerId).then((orders: Array<Order>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

export const OrderController: Router = orderController;
