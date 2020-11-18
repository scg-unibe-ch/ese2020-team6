import { Transaction } from 'sequelize';
import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';
import { UserService } from './user.service';
import { Model } from 'sequelize/types';

export class OrderService {

    private static buildAndCheckOrderAttributes(
      buyerId: number,
      sellerId: number,
      productId: number
    ): Promise<OrderCreationAttributes> {
      if (buyerId && sellerId && productId) {
        return Promise.resolve({
          buyerId: buyerId,
          sellerId: sellerId,
          productId: productId
        });
      } else {
        return Promise.reject({ message: 'Not enought information to build the order!' });
      }
    }

    private static buildAndCheckItemSoldAttributes(
      orderId: number,
      paymentMethod: string,
      shippingAddressId: number
    ): Promise<ItemSoldCreationAttributes> {
      if (orderId && paymentMethod && shippingAddressId) {
        return Promise.resolve({
          orderId: orderId,
          paymentMethod: paymentMethod,
          shippingAddressId: shippingAddressId
        });
      } else {
        return Promise.reject({ message: 'Not enought information to build the buy item order!' });
      }
    }


    private static buildAndCheckItemRentedAttributes(
      orderId: number,
      paymentMethod: string,
      shippingAddressId: number,
      hours: number
    ): Promise<ItemRentedCreationAttributes> {
      if (orderId && paymentMethod && shippingAddressId && hours) {
        return Promise.resolve({
          orderId: orderId,
          paymentMethod: paymentMethod,
          shippingAddressId: shippingAddressId,
          hours: hours
        });
      } else {
        return Promise.reject({ message: 'Not enought information to build the rent item order!' });
      }
    }

    private static buildAndCheckServiceRentedAttributes(
      orderId: number,
      paymentMethod: string,
      hours: number
    ): Promise<ServiceRentedCreationAttributes> {
      if (orderId && paymentMethod && hours) {
        return Promise.resolve({
          orderId: orderId,
          paymentMethod: paymentMethod,
          hours: hours
        });
      } else {
        return Promise.reject({ message: 'Not enought information to build the rent service order!' });
      }
    }

    public static buyItem(
      buyerId: number,
      sellerId: number,
      productId: number,
      paymentMethod: string,
      shipping: AddressAttributes
    ): Promise<void> {
      return this.buildAndCheckOrderAttributes(
        buyerId,
        sellerId,
        productId
      ).then((checkedOrder: OrderCreationAttributes) =>  {
        console.log(checkedOrder);
        return Promise.resolve();
      }).catch((err: any) => Promise.reject(err));
    }

    public static rentItem(
      buyerId: number,
      sellerId: number,
      productId: number,
      paymentMethod: string,
      shippingAddress: AddressAttributes,
      hours: number
    ): Promise<void> {
      return this.buildAndCheckOrderAttributes(
        buyerId,
        sellerId,
        productId
      ).then((checkedOrder: OrderCreationAttributes) =>  {
        console.log(checkedOrder);
        return Promise.resolve();
      }).catch((err: any) => Promise.reject(err));
    }

    public static purchaseService(
      buyerId: number,
      sellerId: number,
      productId: number,
      paymentMethod: string,
      hours: number
    ): Promise<void> {
      return this.buildAndCheckOrderAttributes(
        buyerId,
        sellerId,
        productId
      ).then((checkedOrder: OrderCreationAttributes) =>  {
        console.log(checkedOrder);
        return Promise.resolve();
      }).catch((err: any) => Promise.reject(err));
    }

    public static createAddress(shipping: string) {
        const address = shipping.split(/[ ,]+/).filter(Boolean);
        Address.create({ streetName: address[0], streetType: address[1], addressNumber: address[2],
                         streetAddress: address[3], neighbourhood: address[4], city: address[5],
                         region: address[6], postal: parseInt(address[7], 10), country: address[8]});
    }

    public static getMyOrders(buyerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ buyerId: buyerId });
    }

    public static getMyProductOrders(sellerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ sellerId: sellerId });
    }

    private static getByAttributes(where: Object): Promise<Array<Order>> {
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
