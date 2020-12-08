import { ProductModel } from '../product/product.model';
import { AddressModel, NullAddress } from '../map/address/address.model';

export interface PostProductFormModel extends Omit<ProductModel, 'productId' | 'sellerId' | 'isDeliverable' | 'rejectionMessage' | 'status' | 'picture' | 'seller' | 'category' | 'expirationDate'> {
  isDeliverableString: string;
  category: string;
  expirationDate: string;
}

export class NullPostProductForm implements PostProductFormModel {
  productType: string = null;
  offerType: string = null;
  title: string = null;
  description: string = null;
  price: number = null;
  address: AddressModel = NullAddress.instance();
  category: string = null;
  subcategory: string = null;
  isDeliverableString: string = null;
  expirationDate: string = null;
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
    public expirationDate: string
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
      category: product.category.toString(),
      subcategory: product.subcategory,
      isDeliverableString: product.isDeliverable ? 'Yes' : 'No',
      expirationDate: product.expirationDate.toString()
    }
  }
}
