import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Order, OrderAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes } from '../models/service-rented.model';
import { UserService } from './user.service';
import { Address } from '../models/address.model';
import { Model } from 'sequelize/types';

const {OP} = require('sequelize');

// export class OrderAssociationsFound extends Order {
//   buyer: User;
//   seller: User;
//   product: Product;
//   itemssold: Array<ItemSold>;
//   itemsrented: Array<ItemRented>;
//   servicesrented: Array<ServiceRented>;
// }
//
// export class OrderAssociationsTransformed extends Order {
//   buyer: User;
//   seller: User;
//   product: Product;
//   itemsold: ItemSold;
//   itemrented: ItemRented;
//   servicerented: ServiceRented;
// }

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

       var orderId: number;
        const product = await Product.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = product.userId;

            //if paymentMethod =wallet
            // if wallet < price -> error "Wallet to small?"
           try {
              await Order.sequelize.transaction(
                   async () => {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
                    //alt: User.incremet( 'wallet', {by: -product.price, where {userId: 'buyerId'}});
                    User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
                    const order = Order.create({ buyerId: buyerId, productId: productId, sellerId: sellerId});
                    OrderService.createAddress(shipping);
                    Product.update({status: 'sold'}, {
                        where: {
                            productId: productId
                        }
                    });
                    orderId = (await order).orderId ;
                });

                 return {
                     ok: true,
                     orderId
                 };
            } catch (err) {

                console.log(err);
                return {
                    ok: false
                };
            }
        }

    public async rentItem(productId: number, hours: number, paymentMethod: string, shipping: string, buyerId: number) {

        var orderId: number;
        const product = await Product.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = product.userId;

        // if paymentMethod = wallet
        // if wallet < price -> error "Wallet to small?
        try{
            await Model.sequelize.transaction(
                async () => {
                    User.increment( 'wallet', {by: -(product.price * hours), where: { userId: buyerId}});
                    User.increment( 'wallet', {by: (product.price * hours), where: { userId: sellerId}});
                    const order = Order.create({productId: productId, buyerId: buyerId, sellerId: sellerId});
                    OrderService.createAddress(shipping);
                    //wollen wir das so? wie besser machen?
                    Product.update({status: 'rent'}, {
                      where: {
                          productId: productId
                       }
                      });
                      orderId = (await order).orderId;
                });

                return {
                    ok: true,
                    orderId
                };
        } catch (err) {

            console.log(err);
            return {
                ok: false
            };
        }
    }

    public async purchaseService(productId: number, hours: number, paymentMethod: string, shipping: string, buyerId: number) {

        var orderId: number;
        const service = await Product.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = service.userId;

        //if paymentMethod = wallet
        // if wallet < price -> error "Wallet to small?"
        try {
            await Model.sequelize.transaction(
                async () => {
                    User.increment( 'wallet', {by: -(service.price * hours), where: { userId: 'buyerId'}});
                    User.increment( 'wallet', {by: (service.price * hours), where: { userId: 'sellerId'}});
                    const order = Order.build({productId: productId, buyerId: buyerId, sellerId: sellerId});
                    OrderService.createAddress(shipping);
                    //wollen wir das besser machen, falls ja,wie?
                    Product.update({status: 'available'}, {
                         where: {
                             productId: productId
                         }
                   });
                   orderId = (await order).orderId;
                });

                return {
                    ok: true,
                    orderId
                };
        } catch (err) {

            console.log(err);
            return {
                ok: false
            };
        }
    }

    public static createAddress(shipping : string) {
        var address = shipping.split(/[ ,]+/).filter(Boolean);
        Address.create({ streetName: address[0], streetType: address[1], addressNumber: address[2],
                         streetAddress: address[3], neighbourhood: address[4], city: address[5],
                         region: address[6], postal: parseInt(address[7], 10), country: address[8]});
    }

    public getMyOrders(buyerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ buyerId: buyerId });
    }

    public getMyProductOrders(sellerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ sellerId: sellerId });
    }

    private getByAttributes(where: Object): Promise<Array<Order>> {
      return Order.findAll({
          where: where,
          include: [
            Order.ItemsSold,
            Order.ItemsRented,
            Order.ServicesRented,
            Order.Product,
            Order.Buyer,
            Order.Seller
          ]
      });
    }

    // private transformOrdersAssociations(ordersFound: Array<OrderAssociationsFound>): Array<OrderAssociationsTransformed> {
    //   const ordersTransformed: Array<OrderAssociationsTransformed> = ordersFound.map((orderFound: OrderAssociationsFound) => {
    //     return this.transformOrderAssociations(orderFound);
    //   });
    //   console.log(ordersTransformed);
    //
    //   return ordersTransformed;
    // }

    // private transformOrderAssociations(orderFound: OrderAssociationsFound): OrderAssociationsTransformed {
    //   const orderFoundCopy: Record<any, any> = Object.assign({}, orderFound);
    //
    //   if (orderFound.itemssold.length > 0) {
    //     orderFoundCopy.itemsold = orderFound.itemssold[0];
    //   } else if (orderFound.itemsrented.length > 0) {
    //     orderFoundCopy.itemrented = orderFound.itemsrented[0];
    //   } else if (orderFound.servicesrented.length > 0) {
    //     orderFoundCopy.servicerented = orderFound.servicesrented[0];
    //   }
    //
    //   delete orderFoundCopy.itemssold;
    //   delete orderFoundCopy.itemsrented;
    //   delete orderFoundCopy.servicesrented;
    //
    //   return Object.assign({}, orderFoundCopy) as OrderAssociationsTransformed;
    // }
}
