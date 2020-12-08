import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { Products, NullProducts } from 'src/app/models/product/products.model';

@Component({
  selector: 'app-approve-products',
  templateUrl: './approve-products.component.html'
})
export class ApproveProductsComponent {

  public unacceptedProducts: Products = NullProducts.instance();
  public displayList = false;

  constructor(
    private productService: ProductService
  ) {
    this.productService.getAllUnreviewedProducts()
    .subscribe((unacceptedProducts: Products) => this.unacceptedProducts = unacceptedProducts);
  }

  get isList(): boolean {
    return this.displayList;
  }
}
