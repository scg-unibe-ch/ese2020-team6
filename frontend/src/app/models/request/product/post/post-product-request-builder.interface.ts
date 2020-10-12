import { PostProductRequestModel } from './post-product-request.model';

export interface PostProductRequestBuilder<T> {
  requestInformation: T;

  build(): PostProductRequestModel;
}
