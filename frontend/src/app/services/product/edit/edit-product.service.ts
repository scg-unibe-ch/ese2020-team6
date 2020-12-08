import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import {
  UpdateProductResponseModel,
  DeleteProductResponseModel } from 'src/app/models/response/response-model.module';
import {
  UpdateProductRequestBuilder,
  UpdateProductRequestModel } from 'src/app/models/request/request.module';

import { environment } from 'src/app/../environments/environment';
import { transformAddress } from 'src/app/models/operator/address.operator';

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
