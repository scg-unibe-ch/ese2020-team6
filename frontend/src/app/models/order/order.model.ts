import { Address, AddressModel } from '../map/address/address.model';
import { UserModel, NullUser } from '../user/user.model';
import { CutUserModel, NullCutUser } from '../user/cut-user.model';
import { ProductModel } from '../product/product.model';

export interface OrderModel {
  orderId: number;
  sellerId: number;
  seller: CutUserModel;
  buyerId: number;
  buyer: UserModel;
  productId: number;
  product: ProductModel;
  paymentMethod?: string;
  shippingAddress?: AddressModel;
  hours?: number;
}

export interface PaymentMethodOrderModelExtention {
  paymentMethod: string;
}

export interface ShippingOrderModelExtention extends PaymentMethodOrderModelExtention {
  shippingAddress: AddressModel;
}

export interface HoursOrderModelExtention extends PaymentMethodOrderModelExtention {
  hours: number;
}

export class Order implements OrderModel {
  constructor(
    public orderId: number,
    public sellerId: number,
    public seller: CutUserModel,
    public buyerId: number,
    public buyer: UserModel,
    public productId: number,
    public product: ProductModel,
    public paymentMethod?: string,
    public shippingAddress?: Address,
    public hours?: number,
  ) {}

  public static buildFromOrderModel(orderModel: OrderModel): Order {
    return new Order(
      orderModel.orderId,
      orderModel.sellerId,
      orderModel.seller,
      orderModel.buyerId,
      orderModel.buyer,
      orderModel.productId,
      orderModel.product,
      orderModel.paymentMethod,
      orderModel.shippingAddress,
      orderModel.hours
    );
  }

  public toString = () : string => {
    return 'The product ' + this.product.title + ' from the seller ' + this.seller.userName + ' has been purchased by ' + this.buyer.userName;
  }
}

export interface OrdersModel {
  orders: Array<OrderModel>;
}

export class Orders implements OrdersModel, IterableIterator<Order> {

  public static NullOrders: Orders = new Orders(new Array<Order>());

  constructor(
    public orders: Array<Order>
  ) {
  }

  public next(): IteratorResult<Order> {
    return this.orders[Symbol.iterator]().next();
  }

  [Symbol.iterator](): IterableIterator<Order> {
    return this.orders[Symbol.iterator]();;
  }

  public static buildFromOrderModels(orderModels: Array<OrderModel>): Orders {
    return new Orders(orderModels.map((orderModel: OrderModel) => {
      return Order.buildFromOrderModel(orderModel);
    }))
  }

  get hasOrders(): boolean {
    return this.orders.length > 0
  }

  public toString = () : string => {
    return this.orders.join(' ');
  }
}
