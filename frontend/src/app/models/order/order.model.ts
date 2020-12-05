import { Address, AddressModel } from '../map/address/address.model';
import { UserModel, User } from '../user/user.model';
import { CutUserModel, NullCutUser } from '../user/cut-user.model';
import { Product, NullProduct } from '../product/product.model';

export interface OrderModel {
  orderId: number;
  sellerId: number;
  seller: CutUserModel;
  buyerId: number;
  buyer: UserModel;
  productId: number;
  product: Product;
  paymentMethod?: string;
  shippingAddress?: AddressModel;
  hours?: number;
  itemsSold?: Array<ShippingOrderModelExtention>;
  itemsRented?: Array<ShippingOrderModelExtention & HoursOrderModelExtention>;
  servicesRented?: Array<HoursOrderModelExtention>;
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

  public static NullOrder: Order = new Order(null,null,new NullCutUser(), null, User.NullUser, null, NullProduct.instance());

  constructor(
    public orderId: number,
    public sellerId: number,
    public seller: CutUserModel,
    public buyerId: number,
    public buyer: UserModel,
    public productId: number,
    public product: Product,
    public paymentMethod?: string,
    public shippingAddress?: Address,
    public hours?: number,

  ) {}

  public static buildFromOrderModel(orderModel: OrderModel): Order {

    this.transFormOrderSubTypes(orderModel);

    return new Order(
      orderModel.orderId,
      orderModel.sellerId,
      orderModel.seller,
      orderModel.buyerId,
      orderModel.buyer,
      orderModel.productId,
      orderModel.product,
      orderModel.paymentMethod,
      Address.buildFromAddressModel(orderModel.shippingAddress),
      orderModel.hours
    );
  }

  private static transFormOrderSubTypes(orderModel: OrderModel): void {
    switch (orderModel.product.offerType) {
      case 'Sell':
        let itemSold: ShippingOrderModelExtention = orderModel.itemsSold[0];
        orderModel.shippingAddress = itemSold.shippingAddress;
        orderModel.paymentMethod = itemSold.paymentMethod;
        break;

      case 'Rent':
        switch (orderModel.product.productType) {
          case 'Item':
            let itemRented: ShippingOrderModelExtention & HoursOrderModelExtention = orderModel.itemsRented[0];
            orderModel.shippingAddress = itemRented.shippingAddress;
            orderModel.paymentMethod = itemRented.paymentMethod;
            orderModel.hours = itemRented.hours;
            break;

          case 'Service':
            let serviceRented = orderModel.servicesRented[0];
            orderModel.paymentMethod = serviceRented.paymentMethod;
            orderModel.hours = serviceRented.hours;
            break;
        }
        break;
    }
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
