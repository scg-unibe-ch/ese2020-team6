import { PostProductRequestModel } from '../post/post-product-request.model';

export interface UpdateProductRequestModel extends PostProductRequestModel {
  productId: number;
}
