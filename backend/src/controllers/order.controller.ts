
import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { ProductService } from '../services/product.service';
import { AddressService } from '../services/address.service';
import { ProductAttributes } from '../models/product.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Order, OrderAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes } from '../models/service-rented.model';
import { Address, AddressAttributes } from '../models/address.model';
import { ItemsRentAttributes } from '../models/itemrent.model';
import { OrderService } from '../services/order.service';


const userService = new UserService();
const addressService = new AddressService();
const orderController: Router = express.Router();

 orderController.put('/item/buy', verifyToken,
 (req: Request, res: Response) => {
     req.body.paymentMethod = 'wallet';

     const order: OrderAttributes = req.body as OrderAttributes;
     const itemSold: ItemSoldAttributes = req.body as ItemSoldAttributes;
     const shippingAddress: AddressAttributes = req.body.shippingAddress as AddressAttributes;

     OrderService.buyItem(order, itemSold, shippingAddress)
     .then(() => res.send()) // output ergänzen
     .catch((err: any) => res.status(500).send(err));
   }
);

orderController.put('/item/rent', verifyToken,
    (req: Request, res: Response) => {
        const productId: number = parseInt(req.params.productId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        const paymentMethod: string = req.params.paymentMethod;
        const shipping: string = req.params.shipping;
        const hours: number = parseInt(req.params.hours, 10);
        OrderService.rentItem(productId, hours, paymentMethod, shipping, userId)

        .then(() => res.send()) // output ergänzen

        .catch((err: any) => res.status(500).send(err));
});

orderController.put('/service/rent', verifyToken,
    (req: Request, res: Response) => {
        const serviceId: number = parseInt(req.params.serviceId, 10);
        const userId: number = parseInt(req.params.userId, 10);
        const paymentMethod: string = req.params.paymentMethod;
        const shipping: string = req.params.shipping;
        const hours: number = parseInt(req.params.hours, 10);
        OrderService.purchaseService(serviceId, hours, paymentMethod, shipping, userId)

        .then(() => res.send()) // output ergänzen

        .catch((err: any) => res.status(500).send(err));
});

orderController.get('/buyer', verifyToken,
  (req: Request, res: Response) => {
    const buyerId: number = req.body.tokenPayload.userId;
    OrderService.getMyOrders(buyerId).then((orders: Array<OrderAttributes>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

orderController.get('/seller', verifyToken,
  (req: Request, res: Response) => {
    const sellerId: number = req.body.tokenPayload.userId;
    OrderService.getMyProductOrders(sellerId).then((orders: Array<OrderAttributes>) => res.send(orders))
    .catch((err: any) => res.status(500).send(err));
  }
);

export const OrderController: Router = orderController;
