export interface OrderRequestModel {
  productId: number;
  paymentMethod: string;
}

export interface ShippingRequestExtension extends OrderRequestModel{
  shippingAddress: string;
}

export interface HoursRequestExtension extends OrderRequestModel{
  hours: number;
}

export interface ShippingHoursRequestExtension extends HoursRequestExtension {
  shippingAddress: string;
}
