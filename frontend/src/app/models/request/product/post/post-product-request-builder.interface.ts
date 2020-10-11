import { RequestBuilder } from '../../request-builder.interface';
import { PostProductRequest } from './post-product-request.model';

export interface PostProductRequestBuilder<T> extends RequestBuilder<T, PostProductRequest> {
  requestInformation: T;
  
  build(): PostProductRequest;
}
