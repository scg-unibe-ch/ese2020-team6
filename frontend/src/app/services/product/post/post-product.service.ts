import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { PostProductResponseModel } from '../../../models/response/product/post/post-product-response.model';
import { PostProductRequestBuilder } from '../../../models/request/product/post/post-product-request-builder.interface';
import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/map/address/address.operator';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public postProduct(requestBuilder: PostProductRequestBuilder): Observable<PostProductResponseModel> {
    return this.httpClient.post<PostProductResponseModel>(
      environment.endpointURL + 'product/post', requestBuilder.buildPostProductRequest()).pipe(transformAddress);
  }
}
