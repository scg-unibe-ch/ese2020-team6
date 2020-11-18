import { Transaction } from 'sequelize';

import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

import { UserService } from './user.service';
import { AddressService } from './address.service';

interface BuyItemAtrributes {
  paymentMethod: string;
  shippingAddress: AddressCreationAttributes;
}

interface RentItemAttributes {
  paymentMethod: string;
  shippingAddress: AddressCreationAttributes;
  hours: number;
}

interface RentServiceAttributes {
  paymentMethod: string;
  hours: number;
}

export class OrderService {

    public static buildAndCheckOrderAttributes(
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

    public static buildAndCheckItemSoldAttributes(
      paymentMethod: string,
      shippingAddress: AddressCreationAttributes
    ): Promise<BuyItemAtrributes> {
      if (paymentMethod && shippingAddress) {
        return AddressService.checkAddressAttributes(shippingAddress).then(() => {
          return Promise.resolve({
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress
          });
        }).catch((err: any) => Promise.reject(err));
      } else {
        return Promise.reject({ message: 'Not enought information to build the buy item order!' });
      }
    }


    public static buildAndCheckItemRentedAttributes(
      paymentMethod: string,
      shippingAddress: AddressCreationAttributes,
      hours: number
    ): Promise<RentItemAttributes> {
      if (paymentMethod && shippingAddress && hours) {
        return AddressService.checkAddressAttributes(shippingAddress).then(() => {
          return Promise.resolve({
            paymentMethod: paymentMethod,
            shippingAddress: shippingAddress,
            hours: hours
          });
        }).catch((err: any) => Promise.reject(err));
      } else {
        return Promise.reject({ message: 'Not enought information to build the rent item order!' });
      }
    }

    public static buildAndCheckServiceRentedAttributes(
      paymentMethod: string,
      hours: number
    ): Promise<RentServiceAttributes> {
      if (paymentMethod && hours) {
        return Promise.resolve({
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
      shippingAddress: AddressCreationAttributes
    ): Promise<void> {
      return this.buildAndCheckOrderAttributes(
        buyerId,
        sellerId,
        productId
      ).then((checkedOrder: OrderCreationAttributes) =>  {
        return this.buildAndCheckItemSoldAttributes(paymentMethod, shippingAddress).then((checkedItemSold) => {
          console.log(checkedItemSold);
          return Promise.resolve();
        }).catch((err: any) => Promise.reject(err));
      }).catch((err: any) => Promise.reject(err));
    }

    public static rentItem(
      buyerId: number,
      sellerId: number,
      productId: number,
      paymentMethod: string,
      shippingAddress: AddressCreationAttributes,
      hours: number
    ): Promise<void> {
      return this.buildAndCheckOrderAttributes(
        buyerId,
        sellerId,
        productId
      ).then((checkedOrder: OrderCreationAttributes) =>  {
        return this.buildAndCheckItemRentedAttributes(paymentMethod, shippingAddress, hours).then((checkedItemRented) => {
          console.log(checkedItemRented);
          return Promise.resolve();
        }).catch((err: any) => Promise.reject(err));
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
        return this.buildAndCheckServiceRentedAttributes(paymentMethod, hours).then((checkedServiceRented) => {
          console.log(checkedServiceRented);
          return Promise.resolve();
        }).catch((err: any) => Promise.reject(err));
      }).catch((err: any) => Promise.reject(err));
    }

    public static createItemSold(): void {

    }

    public static createItemRented(): void {

    }

    public static createServiceRented(): void {
      
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
