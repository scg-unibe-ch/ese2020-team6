import { OrderModel, ShippingOrderModelExtention, HoursOrderModelExtention } from '../../../order/order.model';

export interface OrderRequestModel extends Omit<OrderModel, 'sellerId' | 'buyerId' | 'orderId'> {}

export interface ShippingRequestExtension extends ShippingOrderModelExtention, OrderRequestModel {}

export interface HoursRequestExtension extends HoursOrderModelExtention, OrderRequestModel {}

export interface ShippingHoursRequestExtension extends ShippingOrderModelExtention, HoursOrderModelExtention {}
