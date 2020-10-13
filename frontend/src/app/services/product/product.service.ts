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

  public get(id: number): any {
    // TODO: Implement    
    
    // only for testing till backend ready
    this.products = [
      {
        id: 0,
        title: 'Schöner Tisch',
        price: 50,
        description: 'Ein sehr schöner Tisch aus dem Jahre 1768',
        offerType: 'sell',
        productType: 'item',
        status: 'aviable',
        picture: '../../../../../assets/testImage1.jpeg'
      },
      {
        id: 1,
        title: 'Sehr schneller Kochherd',
        price: 700,
        description: 'Guter Kochherd, der ausgesprochen schnell kocht',
        offerType: 'sell',
        productType: 'item',
        status: 'aviable',
        picture: '../../../../../assets/testImage2.jpeg'
      }
    ];
    return this.products[id];
  }

  public post(requestBuilder: PostProductRequestBuilder<any>): Observable<any> {
    return this.postProductService.post(requestBuilder);
  }
}
