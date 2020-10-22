import { UpdateProductRequestModel } from './update-product-request.model';

export interface UpdateProductRequestBuilder{
  buildUpdateProductRequest(): UpdateProductRequestModel;
}
