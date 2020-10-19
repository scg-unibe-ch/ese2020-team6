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
export class GetProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/buyProduct');
  }

  public getAllUnapprovedProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/unapproved');
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'user/profile/myproducts:' + userId.toString());
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(environment.endpointURL + 'product/productInformation:' + productId.toString());
  }
}
