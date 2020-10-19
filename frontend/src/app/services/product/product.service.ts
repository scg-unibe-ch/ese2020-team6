// Packages
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Services
import { PostProductService } from './post/post-product.service';
import { GetProductService } from './get/get-product.service';
// Models
import { ProductModel } from '../../models/product/product.model';
// Interfaces
import { PostProductRequestBuilder } from '../../models/request/product/post/post-product-request-builder.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private postProductService: PostProductService,
    private getProductService: GetProductService
  ) { }

  public getAllProducts(): Observable<Array<ProductModel>> {
    return this.getProductService.getAllProducts();
  }

  public getAllUnapprovedProducts(): Observable<Array<ProductModel>> {
    return this.getProductService.getAllUnapprovedProducts();
  }

  public getMyProducts(userId: number): Observable<Array<ProductModel>> {
    return this.getProductService.getMyProducts(userId);
  }

  public getProductById(productId: number): Observable<ProductModel> {
    return this.getProductService.getProductById(productId);
  }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.postProductService.post(requestBuilder);
  }

}
