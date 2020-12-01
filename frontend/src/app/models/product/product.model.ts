import { AddressModel, NullAddress } from '../map/address/address.model';

export interface ProductModel {
  productId: number;
  sellerId: number;
  productType: string;
  offerType: string;
  title: string;
  description: string;
  price: number;
  address: AddressModel;
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
  sellerId: number = null;
  productType: string = null;
  offerType: string = null;
  title: string = null;
  description: string = null;
  price: number = null;
  address: AddressModel = new NullAddress();
  picture: string = null;
  category: string = null;
  subcategory: string = null;
  isDeliverable: boolean = null;
  expirationDate: number = null;
  status: string = null;
  rejectionMessage: string = null;
}

export class Product implements ProductModel {

  public static NullProduct: Product = new Product(null,null,null,null,null,null,null,new NullAddress(),null,null,null,null,null,null,null);

  constructor(
    public productId: number,
    public sellerId: number,
    public productType: string,
    public offerType: string,
    public title: string,
    public description: string,
    public price: number,
    public address: AddressModel,
    public picture: string,
    public category: string,
    public subcategory: string,
    public isDeliverable: boolean,
    public expirationDate: number,
    public status: string,
    public rejectionMessage: string
  ) { }

  public toString = () : string => {
    return this.title;
  }

  public static buildFromProductModel(product: ProductModel): Product {
    return new Product (
      product.productId,
      product.sellerId,
      product.productType,
      product.offerType,
      product.title,
      product.description,
      product.price,
      product.address,
      product.picture,
      product.category,
      product.subcategory,
      product.isDeliverable,
      product.expirationDate,
      product.status,
      product.rejectionMessage
    )
  }
}
