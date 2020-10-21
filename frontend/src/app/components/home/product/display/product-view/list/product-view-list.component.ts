// Packages
import { Component, Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../../../models/product/product.model';

@Component({
  selector: 'app-product-view-list',
  templateUrl: './product-view-list.component.html',
  styleUrls: ['./product-view-list.component.scss']
})
export class ProductViewListComponent {

  @Input()
  path: string = "";

  @Input()
  products: Array<ProductModel>;

}
