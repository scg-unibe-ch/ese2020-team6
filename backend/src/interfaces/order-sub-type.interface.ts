import { BelongsToGetAssociationMixin } from 'sequelize';
import { Order } from '../models/order.model';

export interface OrderSubType extends OrderSubTypeAttributes {
  getHours: () => number;
  getOrder: BelongsToGetAssociationMixin<Order>;
}

export interface OrderSubTypeAttributes {
  orderId: number;
  paymentMethod: string;
}
