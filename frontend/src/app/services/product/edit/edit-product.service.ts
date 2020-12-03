import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import {
  UpdateProductResponseModel,
  DeleteProductResponseModel } from '../../../models/response/product/product-response-model.module';
import {
  UpdateProductRequestBuilder,
  UpdateProductRequestModel } from '../../../models/request/product/product-request-model-builder.module';

import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/operator/address.operator';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public deleteProduct(productId: number): Observable<DeleteProductResponseModel> {
    return this.httpClient.delete<DeleteProductResponseModel>(environment.endpointURL + 'product/delete/' + productId.toString()).pipe(transformAddress());
  }

  public updateProduct(requestBuilder: UpdateProductRequestBuilder, productId: number): Observable<UpdateProductResponseModel> {
    const requestBody: UpdateProductRequestModel = requestBuilder.buildUpdateProductRequest();
    return this.httpClient.put<UpdateProductResponseModel>(environment.endpointURL + 'product/update/' + productId.toString(), requestBody).pipe(transformAddress());
  }
}
