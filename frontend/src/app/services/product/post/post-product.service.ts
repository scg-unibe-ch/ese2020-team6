import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostProductRequestBuilder } from '../../../models/request/product/post/post-product-request-builder.interface';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.httpClient.post(environment.endpointURL + 'product/post', requestBuilder.build());
  }
}
