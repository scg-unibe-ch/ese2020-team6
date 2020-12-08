import { Is } from '../../compare/is';
import { AddressResponseModel, AddressResponse } from '../address/address-response.module';
import { ProductModel } from '../../product/product.model';
import { CutUserResponse, CutUserResponseModel } from '../user/cut-user-response.model';

export interface ProductResponseModel extends Omit<ProductModel, 'address' | 'seller' | 'expirationDate'>{
  address: AddressResponseModel;
  seller: CutUserResponseModel;
  expirationDate: string;
}


export class ProductResponse implements ProductResponseModel {
  constructor(
    public productId: number,
    public sellerId: number,
    public seller: CutUserResponse,
    public productType: string,
    public offerType: string,
    public title: string,
    public description: string,
    public price: number,
    public address: AddressResponse,
    public picture: string,
    public category: string,
    public subcategory: string,
    public isDeliverable: boolean,
    public expirationDate: string,
    public status: string,
    public rejectionMessage: string
  ) {}

  static isProductResponseModel(product: ProductResponseModel): product is ProductResponseModel {
    return Is.is(product, [
      'productId', 'sellerId', 'productType', 'expirationDate',
      'offerType', 'title', 'description', 'category', 'subcategory',
      'price', 'picture', 'isDeliverable', 'status'
    ]) && AddressResponse.isAddressResponseModel(product.address)
    && CutUserResponse.isCutUserResponseModel(product.seller);
  }
}
