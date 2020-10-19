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

  public unapprovedProducts: Array<ProductModel>;
  public displayList: boolean = false;

  constructor(
    private productService: ProductService
  ) {
    this.productService.getAll().subscribe((unapprovedProducts: Array<ProductModel>) => this.unapprovedProducts = unapprovedProducts);
  }

  get isList(): boolean {
    return this.displayList;
  }
}
