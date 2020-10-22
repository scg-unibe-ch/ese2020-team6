import { PostProductRequestModel } from './post-product-request.model';

export interface PostProductRequestBuilder {
  buildPostProductRequest(): PostProductRequestModel;
}
