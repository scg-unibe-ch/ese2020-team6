import { BelongsToGetAssociationMixin, Optional } from 'sequelize';
import { Order } from '../models/order.model';
import { Associations } from './associations.interface';

type OrderSubTypeBuilder<M extends OrderSubType<any, any>> = new () => M;
export type OrderSubTypeCtor<M extends OrderSubType<any, any>> = typeof OrderSubType & OrderSubTypeBuilder<M>;

export interface OrderSubTypeAttributes {
  orderId: number;
  paymentMethod: string;
}

export abstract class OrderSubType<T extends OrderSubTypeAttributes, S extends Optional<T, any>>
extends Associations<T, S> implements OrderSubTypeAttributes {

  orderId!: number;
  paymentMethod!: string;

  abstract getHours: () => number;
  abstract getOrder: BelongsToGetAssociationMixin<Order>;
  abstract getSubTypeName: () => string;
}
