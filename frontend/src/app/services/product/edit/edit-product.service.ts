// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Response Models
import {
  UpdateProductResponseModel,
  DeleteProductResponseModel } from '../../../models/response/product/product-response-model.module';
// Request Builders and Request Models
import {
  UpdateProductRequestBuilder,
  UpdateProductRequestModel } from '../../../models/request/product/product-request-model-builder.module';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public deleteProduct(productId: number): Observable<DeleteProductResponseModel> {
    return this.httpClient.delete<DeleteProductResponseModel>(environment.endpointURL + 'product/delete/' + productId.toString());
  }

  public updateProduct(requestBuilder: UpdateProductRequestBuilder): Observable<UpdateProductResponseModel> {
    const requestBody: UpdateProductRequestModel = requestBuilder.buildUpdateProductRequest();
    const productId: number = requestBody.productId;
    return this.httpClient.put<UpdateProductResponseModel>(environment.endpointURL + 'product/update/' + productId.toString(), requestBody);
  }
}
