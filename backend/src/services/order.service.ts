import { Association, Transaction, Model, ModelCtor, Op } from 'sequelize';

import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

import { OrderSubTypeCtor, OrderSubType, OrderSubTypeAttributes } from '../interfaces/order-sub-type.interface';
import { HasCreationArrtibutes,
  CO, COST, COCOST,
  CIS, COIS, COISExPromise,
  CIR, COIR, COIRExPromise,
  CSR, COSR, COSRExPromise
} from '../interfaces/orders.interface';

import { UserService } from './user.service';
import { AddressService } from './address.service';
import { ProductService } from './product.service';

import { StatusError } from '../errors/status.error';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { InstanceDoesAlreadyExistError } from '../errors/instance-does-already-exist.error';

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
          } else if (!product.isAccepted) {
            return Promise.reject(new Error('Buyer cannot buy an unaccepted Product!'));
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
        return AddressService.findOrCreateAddress(shippingAddress).then((existingShippingAddress: Address) => {
          return Promise.resolve({
            creationAttributes: {
              paymentMethod: paymentMethod,
              shippingAddressId: existingShippingAddress.addressId,
              orderId: undefined
            },
            shippingAddress: existingShippingAddress
          });
        });
      } else {
        if (!shippingAddress) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: shippingaddress missing', 400));
        } else if (!paymentMethod) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: paymentMethod missing', 400));
        }
      }
    }


    public static buildAndCheckItemRentedAttributes(
      paymentMethod: string, shippingAddress: AddressCreationAttributes, hours: number
    ): Promise<CIR> {
      if (paymentMethod && shippingAddress && hours) {
        return AddressService.findOrCreateAddress(shippingAddress).then((existingShippingAddress: Address) => {
          return Promise.resolve({
            creationAttributes: {
              paymentMethod: paymentMethod,
              hours: hours,
              shippingAddressId: existingShippingAddress.addressId,
              orderId: undefined
            },
            shippingAddress: existingShippingAddress,
          });
        });
      } else {
        if (!shippingAddress) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: shippingaddress missing', 400));
        } else if (!hours) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: rental time missing', 400));
        } else if (!paymentMethod) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: paymentMethod missing', 400));
        }
      }
    }

    public static buildAndCheckServiceRentedAttributes(
      paymentMethod: string, hours: number
    ): Promise<CSR> {
      if (paymentMethod && hours) {
        return Promise.resolve({
          creationAttributes: {
            paymentMethod: paymentMethod,
            hours: hours,
            orderId: undefined
          },
        });
      } else {
        if (!hours) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: rental time missing', 400));
        } else if (!paymentMethod) {
          return Promise.reject(new StatusError('Not enought information to build the buy item order: paymentMethod missing', 400));
        }
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
        if (checkedOrder.product.offerType === 'Rent') {
          return Promise.reject(new StatusError('You cannot buy an item which is for renting!', 400));
        } else {
          return Promise.resolve({
            checkedOrder: checkedOrder,
            checkedOrderSubType: checkedItemSold
          });
        }
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
        if (checkedOrder.product.offerType === 'Sell') {
          return Promise.reject(new StatusError('You cannot rent an item which is for sale!', 400));
        } else {
          return Promise.resolve({
            checkedOrder: checkedOrder,
            checkedOrderSubType: checkedItemRented
          });
        }
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
        if (checkedOrder.product.offerType === 'Sell') {
          return Promise.reject(new StatusError('You cannot buy a service!', 400));
        } else {
          return Promise.resolve({
            checkedOrder: checkedOrder,
            checkedOrderSubType: checkedServiceRented
          });
        }
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
          return this.createOrder<ItemSold>(ItemSold.scope(), checkedOrderItemSold, transaction)
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
          return this.createOrder<ItemRented>(ItemRented.scope(), checkedOrderItemRented, transaction)
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
          return this.createOrder<ServiceRented>(ServiceRented.scope(), checkedOrderServiceRented, transaction)
          .then((createdServiceRented: ServiceRented) => Promise.all([
              ProductService.setStatus(checkedOrderServiceRented.checkedOrder, transaction),
              UserService.transerFee(createdServiceRented, checkedOrderServiceRented.checkedOrder, transaction)
          ]).then(() => Promise.resolve(createdServiceRented)));
        });
      });
    }

    private static createOrder<M extends OrderSubType<any, any>>(
      model: ModelCtor<M>,
      checkedOrderAndSubType: COCOST<M>,
      transaction: Transaction
    ): Promise<M> {
      return this.findOrCreateOrder(checkedOrderAndSubType.checkedOrder.creationAttributes, transaction)
      .then((createdOrder: Order) => {
        return model.create(Object.assign(checkedOrderAndSubType.checkedOrderSubType.creationAttributes, {
          orderId: createdOrder.orderId
        }), { transaction: transaction});
      });
    }

    public static orderDoesExist(order: OrderCreationAttributes, transaction?: Transaction): Promise<Order> {
      if (Object.keys(order).length === 0) {
        return Promise.reject(new InstanceDoesNotExistError(Order.getTableName()));
      }

      return Order.findOne({
        where: order,
        transaction: transaction,
        rejectOnEmpty: new InstanceDoesNotExistError(Order.getTableName())
      });
    }

    public static orderDoesNotExist(order: OrderCreationAttributes, transaction?: Transaction): Promise<void> {

      return this.orderDoesExist(order, transaction)
      .then((orders) => {
        Promise.reject(new InstanceDoesAlreadyExistError(Order.getTableName()));
      })
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Promise.resolve();
        } else {
          return Promise.reject(err);
        }
      });
    }

    private static findOrCreateOrder(order: OrderCreationAttributes, transaction?: Transaction): Promise<Order> {
      return this.orderDoesExist(order).catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Order.create(order, { transaction: transaction });
        } else {
          return Promise.reject(err);
        }
      });
    }

    public static getOrderTotal(orderSubType: OrderSubType<any, any>, checkedOrder: CO): Promise<number> {
      return Promise.resolve(orderSubType.getHours() * checkedOrder.product.price);
    }

    /************************************************
      Getters
    ************************************************/

    public static getMyOrders(buyerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ buyerId: buyerId }, Order.associations.seller, Order.associations.buyer)
      .then((orders: Array<Order>) => {
        return Promise.resolve(orders);
      });
    }

    public static getMyProductOrders(sellerId: number): Promise<Array<Order>> {
      return this.getByAttributes({ sellerId: sellerId }, Order.associations.buyer, Order.associations.seller)
      .then((orders: Array<Order>) => {
        return Promise.resolve(orders);
      });
    }

    private static getByAttributes(where: Object, cut: Association<Order, User>, noCut: Association<Order, User>): Promise<Array<Order>> {
      return Order.findAll({
          where: where,
          include: [
            {
                association: cut,
                attributes: ['userId', 'userName', 'email']
            },
            noCut,
            Order.associations.product,
            {
              association: Order.associations.itemsSold,
              include: [ItemSold.associations.shippingAddress]
            },
            {
              association: Order.associations.itemsRented,
              include: [ItemRented.associations.shippingAddress]
            },
            Order.associations.servicesRented
          ]
      });
    }

    private static buildWhereOperator(attributes: Object, operator: any): Object {
      const where: Array<Object> = Object.entries(attributes).map(([key, value]) => {
        return {
          [key]: value
        };
      });

      return {
        where: {
          [operator]: where
        },
        include: Order.getAllAssociations()
      };
    }
}
