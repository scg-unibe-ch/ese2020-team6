import { Component, Input } from '@angular/core';
import { ProductModel } from '../../../../../../models/product/product.model';

@Component({
  selector: 'app-product-view-grid',
  templateUrl: './product-view-grid.component.html',
  styleUrls: ['./product-view-grid.component.scss']
})
export class ProductViewGridComponent {

  @Input()
  path: string = "";

  @Input()
  products: Array<ProductModel>;

}
