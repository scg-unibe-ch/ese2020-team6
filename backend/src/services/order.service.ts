import { Association, Transaction } from 'sequelize';

import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

import { OrderSubType, OrderSubTypeAttributes } from '../interfaces/order-sub-type.interface';
import { CO, CIS, COIS, COISExPromise, CIR, COIR, COIRExPromise, CSR, COSR, COSRExPromise } from '../interfaces/orders.interface';

import { UserService } from './user.service';
import { AddressService } from './address.service';
import { ProductService } from './product.service';

import { StatusError } from '../errors/status.error';

export class OrderService {

    public static buildAndCheckOrderAttributes(
      buyerId: number, productId: number
    ): Promise<CO> {
      if (buyerId && productId) {
        return Promise.all([
          UserService.doesUserExistById(buyerId),
          ProductService.productDoesExist({productId: productId})
          .then((product: Product) => product.getSeller().then((seller: User) => Promise.resolve([product, seller])))
        ]).then(([buyer, [product, seller]]: [User, [Product, User]]) => {
          if (buyer.userId === seller.userId) {
            return Promise.reject(new StatusError('Seller cannot buy his own product!', 400));
          } else {
            return Promise.resolve({
              creationAttributes: { buyerId: buyerId, sellerId: product.sellerId, productId: productId },
              buyer: buyer, seller: seller, product: product
            });
          }
        });
      } else {
        return Promise.reject(new StatusError('Not enought information to build the order!', 400));
      }
    }

    public static buildAndCheckItemSoldAttributes(
      paymentMethod: string, shippingAddress: AddressCreationAttributes
    ): Promise<CIS> {
      if (paymentMethod && shippingAddress) {
        return AddressService.findOrCreate(shippingAddress).then((existingShippingAddress: Address) => {
          return Promise.resolve({
            creationAttributes: {
              paymentMethod: paymentMethod,
              shippingAddressId: existingShippingAddress.addressId
            },
            shippingAddress: existingShippingAddress
          });
        });
      } else {
        return Promise.reject(new StatusError('Not enought information to build the buy item order!', 400));
      }
    }


    public static buildAndCheckItemRentedAttributes(
      paymentMethod: string, shippingAddress: AddressCreationAttributes, hours: number
    ): Promise<CIR> {
      if (paymentMethod && shippingAddress && hours) {
        return AddressService.findOrCreate(shippingAddress).then((existingShippingAddress: Address) => {
          return Promise.resolve({
            creationAttributes: {
              paymentMethod: paymentMethod,
              hours: hours,
              shippingAddressId: existingShippingAddress.addressId
            },
            shippingAddress: existingShippingAddress,
          });
        });
      } else {
        return Promise.reject(new StatusError('Not enought information to build the buy item order!', 400));
      }
    }

    public static buildAndCheckServiceRentedAttributes(
      paymentMethod: string, hours: number
    ): Promise<CSR> {
      if (paymentMethod && hours) {
        return Promise.resolve({
          creationAttributes: {
            paymentMethod: paymentMethod,
            hours: hours
          },
        });
      } else {
        return Promise.reject(new StatusError('Not enought information to build the rent service order!', 400));
      }
    }

    private static checkBuyItem(
      buyerId: number, productId: number, paymentMethod: string, shippingAddress: AddressCreationAttributes
    ): Promise<COIS> {
      return Promise.all([
        this.buildAndCheckOrderAttributes(buyerId, productId),
        this.buildAndCheckItemSoldAttributes(paymentMethod, shippingAddress)
      ])
      .then(([checkedOrder, checkedItemSold]: COISExPromise) => {
        return Promise.resolve({
          checkedOrder: checkedOrder,
          checkedItemSold: checkedItemSold
        });
      });
    }

    private static checkRentItem(
      buyerId: number, productId: number, paymentMethod: string, shippingAddress: AddressCreationAttributes, hours: number
    ): Promise<COIR> {
      return Promise.all([
        this.buildAndCheckOrderAttributes(buyerId, productId),
        this.buildAndCheckItemRentedAttributes(paymentMethod, shippingAddress, hours)
      ])
      .then(([checkedOrder, checkedItemRented]: COIRExPromise) => {
        return Promise.resolve({
          checkedOrder: checkedOrder,
          checkedItemRented: checkedItemRented
        });
      });
    }

    private static checkRentService(
      buyerId: number, productId: number, paymentMethod: string, hours: number
    ): Promise<COSR> {
      return Promise.all([
        this.buildAndCheckOrderAttributes(buyerId, productId),
        this.buildAndCheckServiceRentedAttributes(paymentMethod, hours)
      ])
      .then(([checkedOrder, checkedServiceRented]: COSRExPromise) => {
        return Promise.resolve({
          checkedOrder: checkedOrder,
          checkedServiceRented: checkedServiceRented
        });
      });
    }

    public static buyItem(
      buyerId: number,
      productId: number,
      paymentMethod: string,
      shippingAddress: AddressCreationAttributes
    ): Promise<ItemSold> {
      return this.checkBuyItem(buyerId, productId, paymentMethod, shippingAddress)
      .then((checkedOrderItemSold: COIS) => {
        return Order.sequelize.transaction((transaction: Transaction) => {
          return this.createItemSold(checkedOrderItemSold.checkedOrder, checkedOrderItemSold.checkedItemSold, transaction)
          .then((createdItemSold: ItemSold) => Promise.all([
              ProductService.setStatus(checkedOrderItemSold.checkedOrder, transaction),
              UserService.transerFee(createdItemSold, checkedOrderItemSold.checkedOrder, transaction)
          ]).then(() => Promise.resolve(createdItemSold)));
        });
      });
    }

    public static rentItem(
      buyerId: number,
      productId: number,
      paymentMethod: string,
      shippingAddress: AddressCreationAttributes,
      hours: number
    ): Promise<ItemRented> {
      return this.checkRentItem(buyerId, productId, paymentMethod, shippingAddress, hours)
      .then((checkedOrderItemRented: COIR) => {
        return Order.sequelize.transaction((transaction: Transaction) => {
          return this.createItemRented(checkedOrderItemRented.checkedOrder, checkedOrderItemRented.checkedItemRented, transaction)
          .then((createdItemRented: ItemRented) => Promise.all([
              ProductService.setStatus(checkedOrderItemRented.checkedOrder, transaction),
              UserService.transerFee(createdItemRented, checkedOrderItemRented.checkedOrder, transaction)
          ]).then(() => Promise.resolve(createdItemRented)));
        });
      });
    }

    public static rentService(
      buyerId: number,
      productId: number,
      paymentMethod: string,
      hours: number
    ): Promise<ServiceRented> {
      return this.checkRentService(buyerId, productId, paymentMethod, hours)
      .then((checkedOrderServiceRented: COSR) => {
        return Order.sequelize.transaction((transaction: Transaction) => {
          return this.createServiceRented(
            checkedOrderServiceRented.checkedOrder,
            checkedOrderServiceRented.checkedServiceRented, transaction)
          .then((createdServiceRented: ServiceRented) => Promise.all([
              ProductService.setStatus(checkedOrderServiceRented.checkedOrder, transaction),
              UserService.transerFee(createdServiceRented, checkedOrderServiceRented.checkedOrder, transaction)
          ]).then(() => Promise.resolve(createdServiceRented)));
        });
      });
    }

    public static createItemSold(
      checkedOrder: CO,
      checkedItemSold: CIS,
      transaction: Transaction
    ): Promise<ItemSold> {
      return Order.create(checkedOrder.creationAttributes, { transaction: transaction })
      .then((createdOrder: Order) => {
        return ItemSold.create(Object.assign(checkedItemSold.creationAttributes, {
          orderId: createdOrder.orderId
        }), { include: ItemSold.getAllAssociations(), transaction: transaction });
      });
    }

    public static createItemRented (
      checkedOrder: CO,
      checkedItemRented: CIR,
      transaction: Transaction
    ): Promise<ItemRented> {
      return Order.create(checkedOrder.creationAttributes, { transaction: transaction })
      .then((createdOrder: Order) => {
        return ItemRented.create(Object.assign(checkedItemRented.creationAttributes, {
          orderId: createdOrder.orderId
        }), { include: ItemRented.getAllAssociations(), transaction: transaction });
      });
    }

    public static createServiceRented (
      checkedOrder: CO,
      checkedServiceRented: CSR,
      transaction: Transaction
    ): Promise<ServiceRented> {
      return Order.create(checkedOrder.creationAttributes, { transaction: transaction })
      .then((createdOrder: Order) => {
        return ServiceRented.create(Object.assign(checkedServiceRented.creationAttributes, {
          orderId: createdOrder.orderId
        }), { include: ServiceRented.getAllAssociations(), transaction: transaction });
      });
    }

    public static getOrderTotal(orderSubType: OrderSubType, checkedOrder: CO): Promise<number> {
      return Promise.resolve(orderSubType.getHours() * checkedOrder.product.price);
    }

    /************************************************
      Getters
    ************************************************/

    public static getMyOrders(buyerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ buyerId: buyerId });
    }

    public static getMyProductOrders(sellerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ sellerId: sellerId });
    }

    private static getByAttributes(where: Object): Promise<Array<Order>> {
      return Order.findAll({
          where: where,
          include: Object.values(Order.associations)
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
