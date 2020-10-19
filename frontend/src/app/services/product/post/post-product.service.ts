// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Models
import { ProductModel } from '../../../models/product/product.model';
// Interfaces
import { PostProductRequestBuilder } from '../../../models/request/product/post/post-product-request-builder.interface';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'product/post', requestBuilder.build());
  }
  
  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(
      environment.endpointURL + 'product/delete:' + id);
  }

}
