import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductInformationComponent } from 'src/app/components/home/product/product-information/product-information.component';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {
    // for routes with parameters
    const routes: Routes = [
      { path: 'user/profile/myproducts/:id' , component: ProductInformationComponent}
     ];
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    });
  }
}
