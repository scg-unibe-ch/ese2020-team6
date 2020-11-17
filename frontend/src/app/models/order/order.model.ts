import { AddressModel } from '../map/address/address.model';

export interface OrderModel {
  orderId: number;
  sellerId: number;
  buyerId: number;
  productId: number;
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
