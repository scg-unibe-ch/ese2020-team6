import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-product-view-list',
  templateUrl: './product-view-list.component.html',
  styleUrls: ['./product-view-list.component.scss']
})
export class ProductViewListComponent {

  @Input()
  path = '';

  @Input()
  products: Array<ProductModel>;

}
