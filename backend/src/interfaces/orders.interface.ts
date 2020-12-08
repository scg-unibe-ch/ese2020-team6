import { Model } from 'sequelize';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { ItemSold } from '../models/item-sold.model';
import { ItemRented } from '../models/item-rented.model';
import { ServiceRented} from '../models/service-rented.model';
import { Address } from '../models/address.model';

import { OrderSubType } from './order-sub-type.interface';

export interface HasCreationArrtibutes<M extends Model> {
  creationAttributes: M['_creationAttributes'];
}
export interface CO extends HasCreationArrtibutes<Order> {
  buyer: User;
  seller: User;
  product: Product;
}


export interface COST<T extends OrderSubType<any, any>> extends HasCreationArrtibutes<T> {}

export interface CIS extends COST<ItemSold> { shippingAddress: Address; }
export interface COIS extends COCOST<ItemSold> { checkedOrder: CO; checkedOrderSubType: CIS; }
export type COISExPromise = [CO, CIS];


export interface CIR extends COST<ItemRented> { shippingAddress: Address; }
export interface COIR extends COCOST<ItemRented> { checkedOrder: CO; checkedOrderSubType: CIR; }
export type COIRExPromise = [CO, CIR];


export interface CSR extends COST<ServiceRented> {}
export interface COSR extends COCOST<ServiceRented> { checkedOrder: CO; checkedOrderSubType: CSR; }
export type COSRExPromise = [CO, CSR];

export interface COCOST<M extends OrderSubType<any, any>> {
  checkedOrder: CO;
  checkedOrderSubType: COST<M>;
}
