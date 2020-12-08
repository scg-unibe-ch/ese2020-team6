import { Address, AddressModel, NullAddress } from '../map/address/address.model';
import { UserModel, NullUser } from '../user/user.model';
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

    let shippingAddress = orderModel.shippingAddress ? Address.buildFromAddressModel(orderModel.shippingAddress) : NullAddress.instance();

    return new Order(
      orderModel.orderId,
      orderModel.sellerId,
      orderModel.seller,
      orderModel.buyerId,
      orderModel.buyer,
      orderModel.productId,
      orderModel.product,
      orderModel.paymentMethod,
      shippingAddress,
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

  get hasShippingAddress(): boolean {
    return !(this.shippingAddress instanceof NullAddress);
  }
}

export class NullOrder extends Order {
  private static _instance: NullOrder;

  constructor() {
    super(null, null, NullCutUser.instance(), null, NullUser.instance(), null,
    NullProduct.instance(), null, NullAddress.instance(), null);
  }

  public static instance(): NullOrder {
    if (!NullOrder._instance) NullOrder._instance = new NullOrder();
    return NullOrder._instance;
  }
}
