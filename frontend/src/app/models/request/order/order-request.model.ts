import { ShippingOrderModelExtention, HoursOrderModelExtention } from 'src/app/models/order/order.model';

export interface OrderRequestModel {
  productId: number;
}

export interface ShippingRequestExtension extends ShippingOrderModelExtention, OrderRequestModel {}

export interface HoursRequestExtension extends HoursOrderModelExtention, OrderRequestModel {}

export interface ShippingHoursRequestExtension extends ShippingRequestExtension, HoursRequestExtension {}
