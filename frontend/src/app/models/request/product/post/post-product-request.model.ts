import { ProductModel } from '../../../product/product.model';
import { PostProductFormModel } from '../../../form/post-product-form.model';
import { AddressModel } from '../../../map/address/address.model';

export interface PostProductRequestModel extends Omit<ProductModel, 'productId' | 'sellerId' | 'rejectionMessage' | 'status'>{}

export class PostProductRequest implements PostProductRequestModel {
  constructor(
    public productType: string,
    public offerType: string,
    public title: string,
    public description: string,
    public price: number,
    public address: AddressModel,
    public picture: any,
    public category: string,
    public subcategory: string,
    public isDeliverable: boolean,
    public expirationDate: number,
  ) { }

  public toString = () : string => {
    return this.title;
  }

  public static buildFromPostProductFormModel(postProductForm: PostProductFormModel, picture: any): PostProductRequest {
    return new PostProductRequest (
      postProductForm.productType,
      postProductForm.offerType,
      postProductForm.title,
      postProductForm.description,
      postProductForm.price,
      postProductForm.address,
      picture,
      postProductForm.category,
      postProductForm.subcategory,
      postProductForm.isDeliverableString === 'Yes' ? true : false,
      postProductForm.expirationDate,
    )
  }
}
