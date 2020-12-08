import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProductModel, Product } from '../../../models/product/product.model';
import { GetService } from '../../get-service';
import { Categories, CategoryModel } from '../../../models/category/category.module';
import { transformProducts, transformAddress, transformCategories, transformProduct } from 'src/app/models/operator/index.module';
import { Products } from 'src/app/models/product/products.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductService extends GetService {

  constructor(
    httpClient: HttpClient,
  ) {
    super('product/', httpClient);
  }

  public getAllProducts(): Observable<Products> {
    return this.get<Array<ProductModel>>('all').pipe(transformProducts());
  }

  public getAllAcceptedProducts(): Observable<Products> {
    return this.get<Array<ProductModel>>('accepted').pipe(transformProducts());
  }

  public getMyRejectedProducts(userId: number): Observable<Products> {
    return this.get<Array<ProductModel>>('rejected/' + userId.toString()).pipe(transformProducts());
  }

  public getAllUnreviewedProducts(): Observable<Products> {
    return this.get<Array<ProductModel>>('unreviewed').pipe(transformProducts());
  }

  public getMyProducts(userId: number): Observable<Products> {
    return this.get<Array<ProductModel>>('myproducts/' + userId.toString()).pipe(transformProducts());
  }

  public getProductById(productId: number): Observable<Product> {
    return this.get<ProductModel>('details/' + productId.toString()).pipe(transformProduct());
  }

  public getMyRejectedProductsCount(userId: number): Observable<number> {
    return this.get<{amountOfRejected: number}>('rejected/count/' + userId.toString()).pipe(pluck('amountOfRejected'));
  }

  public getUnreviewedProductsCount(): Observable<number> {
    return this.get<{amountOfUnreviewd: number}>('unreviewd/count').pipe(pluck('amountOfUnreviewd'));
  }

  public getCategories(): Observable<Categories> {
    return this.get<Array<CategoryModel>>('category/categories').pipe(transformCategories());
  }
}
