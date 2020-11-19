import { BelongsToGetAssociationMixin } from 'sequelize';
import { Order } from '../models/order.model';
import { IsForRent } from '../interfaces/is-for-rent.interface';

export interface OrderSubType extends IsForRent {
  isForRent: () => boolean;
  getHours: () => number;
  getOrder: BelongsToGetAssociationMixin<Order>;
}

export interface OrderSubTypeAttributes {
  orderId: number;
  paymentMethod: string;
}
