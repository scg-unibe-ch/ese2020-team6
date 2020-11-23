export interface OrderResponseModel {
  orderId: number;
  productId: number;
  paymentMethod: string;
}

export interface ShippingResponseExtension extends OrderResponseModel{
  shippingAddress: string;
}

export interface HoursResponseExtension extends OrderResponseModel{
  hours: number;
}

export interface ShippingHoursResponseExtension extends HoursResponseExtension {
  shippingAddress: string;
}
