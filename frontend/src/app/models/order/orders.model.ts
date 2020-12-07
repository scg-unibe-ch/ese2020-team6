import { OrderModel, Order } from './order.model';

export interface OrdersModel {
  orders: Array<OrderModel>;
}

export class Orders implements OrdersModel, IterableIterator<Order> {

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

export class NullOrders extends Orders {
  private static _instance: NullOrders;

  constructor() {
    super(new Array<Order>());
  }

  public static instance(): NullOrders {
    if (!NullOrders._instance) NullOrders._instance = new NullOrders();
    return NullOrders._instance;
  }

}
