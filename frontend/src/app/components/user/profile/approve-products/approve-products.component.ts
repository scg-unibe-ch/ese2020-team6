// Packages
import { Component } from '@angular/core';
// Services
import { ProductService } from '../../../../services/product/product.service';
// Models
import { ProductModel } from '../../../../models/product/product.model';

@Component({
  selector: 'app-approve-products',
  templateUrl: './approve-products.component.html',
  styleUrls: ['./approve-products.component.scss']
})
export class ApproveProductsComponent {

  public products: Array<ProductModel>;

  constructor(
    private productService: ProductService
  ) {
    this.productService.getAll().subscribe((products: Array<ProductModel>) => this.products = products);
  }
}
