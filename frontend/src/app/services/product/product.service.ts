import { Injectable } from '@angular/core';
import { PostProductService } from './post/post-product.service';
import { PostProductRequestBuilder } from '../../models/request/product/post/post-product-request-builder.interface';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private postProductService: PostProductService
  ) { }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.postProductService.post(requestBuilder);
  }
}
