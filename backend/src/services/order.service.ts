import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Order, OrderAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes } from '../models/service-rented.model';
import { UserService } from './user.service';

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

        const product = await Product.findOne({
            where: {
                productId: productId
            }
        });
        const seller = await User.findOne({
            where: {
                userId: buyerId
            }
        });
        const sellerId: number = product.userId;

        // if wallet

           try {
              await Order.sequelize.transaction(
                   async () => {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
                    User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
                    Order.create({ buyerId: buyerId, productId: productId, sellerId: sellerId});
                    Product.update({status: 'sold'}, {
                        where: {
                            productId: productId
                        }
                    });
                });

                 return {
                          ok: true
                 };
                } catch (err) {
                console.log(err);
                return{
                    ok: false
                };
            }
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
