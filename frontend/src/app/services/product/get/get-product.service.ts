import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProductModel } from '../../../models/product/product.model';
import { GetService } from '../../get-service';
import { environment } from '../../../../environments/environment';
import { transformAddress } from '../../../models/map/address/address.operator';
import { transformCategory } from '../../../models/category/category.operator';
import { Categories, CategoryModel } from '../../../models/category/category.model';

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
    return this.get<Array<ProductModel>>('all').pipe(transformAddress);;
  }

  public getAllAcceptedProducts(): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('accepted').pipe(transformAddress);
  }

  public getMyRejectedProducts(userId: number): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('rejected/' + userId.toString()).pipe(transformAddress);;
  }

  public getAllUnreviewedProducts(): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('unreviewed').pipe(transformAddress);;
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.get<Array<ProductModel>>('myproducts/' + userId.toString()).pipe(transformAddress);;
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.get<ProductModel>('details/' + productId.toString()).pipe(transformAddress);;
  }

  public getMyRejectedProductsCount(userId: number): Observable<number> {
    return this.get<{amountOfRejected: number}>('rejected/count/' + userId.toString()).pipe(pluck('amountOfRejected'));
  }

  public getUnreviewedProductsCount(): Observable<number> {
    return this.get<{amountOfUnreviewd: number}>('unreviewd/count').pipe(pluck('amountOfUnreviewd'));
  }

  public getCategories(): Observable<Categories> {
    return this.get<Array<CategoryModel>>('category/categories/').pipe(transformCategory);
  }
}
