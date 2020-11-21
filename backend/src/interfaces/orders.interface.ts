import { Optional, Model } from 'sequelize';
import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

import { OrderSubType, OrderSubTypeAttributes } from './order-sub-type.interface';

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
