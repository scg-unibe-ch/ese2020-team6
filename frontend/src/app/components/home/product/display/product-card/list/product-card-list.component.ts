// Packages
import { Component, Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../../../models/product/product.model';
// Components
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent extends ProductCardComponent {

}
