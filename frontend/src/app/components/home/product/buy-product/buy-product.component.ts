import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Routes } from '@angular/router';
import { ProductInformationComponent } from '../product-information/product-information.component';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {
  products: any;

  constructor() {
    // for routes with parameters
    const routes: Routes = [
      { path: 'product-information/:id' , component: ProductInformationComponent}
     ];
  }

  ngOnInit(): void {
    // only for testing till backend ready
    this.products = [
      {
        id: 0,
        title: 'Schöner Tisch',
        price: 50,
        description: 'Ein sehr schöner Tisch aus dem Jahre 1768',
        offerType: 'rent',
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
  }
}
