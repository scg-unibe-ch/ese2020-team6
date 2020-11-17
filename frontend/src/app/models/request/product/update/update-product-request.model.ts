import { PostProductRequestModel } from '../../../request/product/post/post-product-request.model';
import { PostProductFormModel } from '../../../form/post-product-form.model';
import { AddressModel, NullAddress } from '../../../map/address/address.model';

export interface UpdateProductRequestModel extends PostProductRequestModel {}

export class UpdateProductRequest implements UpdateProductRequestModel {
  constructor(
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
  ) { }

  public toString = () : string => {
    return this.title;
  }

  public static buildFromPostProductFormModel(postProductForm: PostProductFormModel, picture: string): UpdateProductRequest {
    return new UpdateProductRequest (
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
