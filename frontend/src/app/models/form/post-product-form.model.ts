import { ProductModel } from '../product/product.model';
import { AddressModel, NullAddress } from '../map/address/address.model';

export interface PostProductFormModel extends Omit<ProductModel, 'productId' | 'userId' | 'isDeliverable' | 'rejectionMessage' | 'status' | 'picture'> {
  isDeliverableString: string;
}

export class NullPostProductForm implements PostProductFormModel {
  productType: string = null;
  offerType: string = null;
  title: string = null;
  description: string = null;
  price: number = null;
  address: AddressModel = new NullAddress();
  category: string = null;
  subcategory: string = null;
  isDeliverableString: string = null;
  expirationDate: number = null;
}

export class PostProductForm implements PostProductFormModel {
  constructor(
    public productType: string,
    public offerType: string,
    public title: string,
    public description: string,
    public price: number,
    public address: AddressModel,
    public category: string,
    public subcategory: string,
    public isDeliverableString: string,
    public expirationDate: number
  ) { }

  public toString = () : string => {
    return this.title;
  }

  public static buildFromProductModel(product: ProductModel): PostProductFormModel {
    return {
      productType: product.productType,
      offerType: product.offerType,
      title: product.title,
      description: product.description,
      price: product.price,
      address: product.address,
      category: product.category,
      subcategory: product.subcategory,
      isDeliverableString: product.isDeliverable ? 'Yes' : 'No',
      expirationDate: product.expirationDate
    }
  }
}
