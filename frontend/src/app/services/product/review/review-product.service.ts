import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import {
  AcceptProductResponseModel,
  RejectProductResponseModel } from '../../../models/response/product/product-response-model.module';
import {
  AcceptProductRequestBuilder,
  AcceptProductRequestModel,
  RejectProductRequestBuilder,
  RejectProductRequestModel } from '../../../models/request/product/product-request-model-builder.module';

import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/operator/address.operator';

@Injectable({
  providedIn: 'root'
})
export class ReviewProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public acceptProduct(requestBuilder: AcceptProductRequestBuilder): Observable<AcceptProductResponseModel> {
    const requestBody: AcceptProductRequestModel = requestBuilder.buildAcceptProductRequest();
    const productId = requestBody.productId;
    return this.httpClient.put<AcceptProductResponseModel>(environment.endpointURL + 'product/accept/' + productId.toString(), requestBody).pipe(transformAddress());
  }

  public rejectProduct(requestBuilder: RejectProductRequestBuilder): Observable<RejectProductResponseModel> {
    const requestBody: RejectProductRequestModel = requestBuilder.buildRejectProductRequest();
    const productId: number = requestBody.productId;
    return this.httpClient.put<RejectProductResponseModel>(environment.endpointURL + 'product/reject/' + productId.toString(), requestBody).pipe(transformAddress());
  }

}
