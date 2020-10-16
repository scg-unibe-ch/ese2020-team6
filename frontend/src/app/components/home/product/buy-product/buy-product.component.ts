import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Routes } from '@angular/router';
import { ProductInformationComponent } from '../product-information/product-information.component';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {
    // for routes with parameters
    const routes: Routes = [
      { path: 'product-information/:id' , component: ProductInformationComponent}
     ];
  }

  build() {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }
}
