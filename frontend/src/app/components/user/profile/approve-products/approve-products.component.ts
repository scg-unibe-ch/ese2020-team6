import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { ProductModel } from '../../../../models/product/product.model';

@Component({
  selector: 'app-approve-products',
  templateUrl: './approve-products.component.html'
})
export class ApproveProductsComponent {

  public unacceptedProducts: Array<ProductModel>;
  public displayList = false;

  constructor(
    private productService: ProductService
  ) {
    this.productService.getAllUnreviewedProducts()
    .subscribe((unacceptedProducts: Array<ProductModel>) => this.unacceptedProducts = unacceptedProducts);
  }

  get isList(): boolean {
    return this.displayList;
  }
}
