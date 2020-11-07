import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { pluck } from 'rxjs/operators';
// Models
import { ProductModel } from '../../../models/product/product.model';
import { environment } from '../../../../environments/environment';
import { CategoryModel } from 'src/app/models/request/product/category-product-request.model';

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

  public getAllAcceptedProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/accepted');
  }

  public getMyRejectedProducts(userId: number): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/rejected/' + userId.toString());
  }

  public getAllUnreviewedProducts(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/unreviewed');
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(environment.endpointURL + 'product/myproducts/' + userId.toString());
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(environment.endpointURL + 'product/details/' + productId.toString());
  }

  public getMyRejectedProductsCount(userId: number): Observable<number> {
    return this.httpClient.get<{amountOfRejected: number}>(environment.endpointURL + 'product/rejected/count/' + userId.toString()).pipe(pluck('amountOfRejected'));
  }

  public getUnreviewedProductsCount(): Observable<number> {
    return this.httpClient.get<{amountOfUnreviewd: number}>(environment.endpointURL + 'product/unreviewd/count').pipe(pluck('amountOfUnreviewd'));
  }

  public getCategories(): Observable<Array<CategoryModel>> {
    return this.httpClient.get<Array<CategoryModel>>(environment.endpointURL + 'product/categories/');
  }

  public getSubCategories(): Observable<Array<CategoryModel>> {
    return this.httpClient.get<Array<CategoryModel>>(environment.endpointURL + 'product/subCategories/');
  }
}
