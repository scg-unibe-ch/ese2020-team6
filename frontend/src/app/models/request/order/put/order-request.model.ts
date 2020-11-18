import { OrderModel, ShippingOrderModelExtention, HoursOrderModelExtention } from '../../../order/order.model';

export interface OrderRequestModel {
  productId: number;
  sellerId: number;
}

export interface ShippingRequestExtension extends ShippingOrderModelExtention, OrderRequestModel {}

export interface HoursRequestExtension extends HoursOrderModelExtention, OrderRequestModel {}

export interface ShippingHoursRequestExtension extends ShippingRequestExtension, HoursRequestExtension {}
