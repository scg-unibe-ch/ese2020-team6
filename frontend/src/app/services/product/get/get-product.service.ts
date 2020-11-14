import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProductModel } from '../../../models/product/product.model';
import { GetService } from '../../get-service';
import { environment } from '../../../../environments/environment';
import { CategoryModel } from 'src/app/models/request/product/category-product-request.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductService extends GetService {

  constructor(
    httpClient: HttpClient,
  ) {
    super('product/', httpClient);
  }

  public getAllProducts(): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('all');
  }

  public getAllAcceptedProducts(): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('accepted');
  }

  public getMyRejectedProducts(userId: number): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('rejected/' + userId.toString());
  }

  public getAllUnreviewedProducts(): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('unreviewed');
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('myproducts/' + userId.toString());
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.get<ProductModel>('details/' + productId.toString());
  }

  public getMyRejectedProductsCount(userId: number): Observable<number> {
    return this.get<{amountOfRejected: number}>('rejected/count/' + userId.toString()).pipe(pluck('amountOfRejected'));
  }

  public getUnreviewedProductsCount(): Observable<number> {
    return this.get<{amountOfUnreviewd: number}>('unreviewd/count').pipe(pluck('amountOfUnreviewd'));
  }

  public getCategories(): Observable<Array<CategoryModel>> {
    return this.get<Array<CategoryModel>>('categories/');
  }

  public getSubCategories(): Observable<Array<CategoryModel>> {
    return this.get<Array<CategoryModel>>('subCategories/');
  }
}
