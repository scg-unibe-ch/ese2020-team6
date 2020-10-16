// Packages
import { Component, Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../models/product/product.model';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent {

  @Input()
  product: ProductModel;

  get statusPillColorClass(): string {
    return this.product.status.toLowerCase();
  }

  detailsPillColorClass(pillContent: string): string {
    return pillContent ? 'faded' : 'fainted';
  }

}
