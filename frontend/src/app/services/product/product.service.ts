import { Injectable } from '@angular/core';
import { PostProductService } from './post/post-product.service';
import { PostProductRequestBuilder } from '../../models/request/product/post/post-product-request-builder.interface';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any; // just for testing

  constructor(
    private postProductService: PostProductService
  ) { }

  public getAll(): Observable<any> {
    return this.postProductService.getAll();
  }

  public get(id: number): Observable<any> {
    return this.postProductService.get(id);
  }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.postProductService.post(requestBuilder);
  }

  public getMyProducts(id: number): Observable<any> {
    return this.postProductService.getMyProducts(id);
  }

  public deleteProduct(id: number): Observable<any> {
    console.log(id, 'dddddddddddddddddddddddddddddwwwwwww');
    return this.postProductService.deleteProduct(id);
  }
}
