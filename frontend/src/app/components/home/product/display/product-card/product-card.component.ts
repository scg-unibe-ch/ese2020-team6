// Packages
import { Component , Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../../models/product/product.model';

@Component({
  selector: 'app-product-card',
  template: ``,
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: ProductModel;

  get statusPillColorClass(): string {
    return this.product.status.toLowerCase();
  }

  detailsPillColorClass(pillContent: string): string {
    return pillContent ? 'faded' : 'fainted';
  }
  
}
