// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Models
import { ProductModel } from '../../../models/product/product.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/all');
  }

  public getAllUnapprovedProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/unreviewed');
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/myproducts/' + userId.toString());
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(environment.endpointURL + 'product/details/' + productId.toString());
  }
}
