import { AddressModel, NullAddress } from '../map/address/address.model';

export interface ProductModel {
  productId: number;
  userId: number;
  productType: string;
  offerType: string;
  title: string;
  description: string;
  price: number;
  location: AddressModel;
  picture: string;
  category: string;
  subcategory: string;
  isDeliverable: boolean;
  expirationDate: number;
  status: string;
  rejectionMessage: string;
}

export class NullProduct implements ProductModel {
  productId: number = null;
  userId: number = null;
  productType: string = null;
  offerType: string = null;
  title: string = null;
  description: string = null;
  price: number = null;
  location: AddressModel = new NullAddress();
  picture: string = null;
  category: string = null;
  subcategory: string = null;
  isDeliverable: boolean = null;
  expirationDate: number = null;
  status: string = null;
  rejectionMessage: string = null;
}
