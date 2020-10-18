import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostProductRequestBuilder } from '../../../models/request/product/post/post-product-request-builder.interface';
import { identity, Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {
  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.httpClient.post(
      environment.endpointURL + 'product/post', requestBuilder.build());
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(environment.endpointURL + 'product/buyProduct');
  }

  public get(id: number): Observable<any> {
    return this.httpClient.get(
      environment.endpointURL + 'product/productInformation:' + id);
  }

  public getMyProducts(id: number): Observable<any> {
    return this.httpClient.get(
      environment.endpointURL + 'user/profile/myproducts:' + id);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(
      environment.endpointURL + 'product/delete:' + id);
  }
  
}
