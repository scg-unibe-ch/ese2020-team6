// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Models
import { AcceptProductResponseModel } from '../../../models/response/product/accept/accept-product-response.model';
// Interfaces
import { AcceptProductRequestBuilder } from '../../../models/request/product/accept/accept-product-request-builder.interface';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewProductService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  public acceptProduct(requestBuilder: AcceptProductRequestBuilder): Observable<AcceptProductResponseModel> {
    let requestBody = requestBuilder.buildAcceptProductRequest();
    let productId = requestBody.productId;
    return this.httpClient.put<AcceptProductResponseModel>(environment.endpointURL + 'product/accept/' + productId.toString(), requestBody);
  }

}
