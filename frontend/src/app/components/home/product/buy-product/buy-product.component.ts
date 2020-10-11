import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {
  products: any;

  constructor() {   }

  ngOnInit(): void {
    // only for testing till backend ready
    this.products = [
      {
        title: 'Schöner Tisch',
        price: 50,
        description: 'Ein sehr schöner Tisch aus dem Jahre 1768',
        offerType: 'sell',
        productType: 'item',
        status: 'aviable',
        picture: '../../../../../assets/testImage1.jpeg'
      },
      {
        title: 'Sehr schneller Kochherd',
        price: 700,
        description: 'Guter Kochherd, der ausgesprochen schnell kocht',
        offerType: 'sell',
        productType: 'item',
        status: 'aviable',
        picture: '../../../../../assets/testImage2.jpeg'
      }
    ];
  }
}
