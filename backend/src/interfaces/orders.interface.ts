import { Optional } from 'sequelize';
import { Product, ProductAttributes } from '../models/product.model';
import { User, UserAttributes } from '../models/user.model';
import { Order, OrderAttributes, OrderCreationAttributes } from '../models/order.model';
import { ItemSold, ItemSoldAttributes, ItemSoldCreationAttributes } from '../models/item-sold.model';
import { ItemRented, ItemRentedAttributes, ItemRentedCreationAttributes } from '../models/item-rented.model';
import { ServiceRented, ServiceRentedAttributes, ServiceRentedCreationAttributes} from '../models/service-rented.model';
import { Address, AddressAttributes, AddressCreationAttributes } from '../models/address.model';

export interface HasCreationArrtibutes<T> {
  creationAttributes: T;
}
export interface CO extends HasCreationArrtibutes<OrderCreationAttributes> {
  creationAttributes: OrderCreationAttributes; // order can be created first, therefore creation attributes
  buyer: User;
  seller: User;
  product: Product;
}

export interface HasPreCreationAttributes<T> {
  preCreationAttributes: T;
}

export interface ItemSoldPreCreationAtrributes  extends Optional<ItemSoldCreationAttributes, 'orderId' | 'shippingAddressId'> {}
export interface CIS extends HasCreationArrtibutes<Optional<ItemSoldCreationAttributes, 'orderId'>> { shippingAddress: Address; }
export interface COIS { checkedOrder: CO; checkedItemSold: CIS; }
export type COISExPromise = [CO, CIS];


export interface ItemRentedPreCreationAttributes extends Optional<ItemRentedCreationAttributes, 'orderId' | 'shippingAddressId'> {}
export interface CIR extends HasCreationArrtibutes<Optional<ItemRentedCreationAttributes, 'orderId'>> { shippingAddress: Address; }
export interface COIR { checkedOrder: CO; checkedItemRented: CIR; }
export type COIRExPromise = [CO, CIR];


export interface ServiceRentedPreCreationAttributes extends Optional<ServiceRentedCreationAttributes, 'orderId'> {}
export interface CSR extends HasCreationArrtibutes<Optional<ServiceRentedCreationAttributes, 'orderId'>> {}
export interface COSR { checkedOrder: CO; checkedServiceRented: CSR; }
export type COSRExPromise = [CO, CSR];
