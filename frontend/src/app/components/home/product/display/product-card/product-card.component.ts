// Packages
import { Component , Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../../models/product/product.model';

@Component({
  selector: 'app-product-card',
  template: ``
})
export class ProductCardComponent {

  @Input()
  product: ProductModel;

  statusIndicatorPillColorClass: () => string = () => {
    let status: string = this.product.status;
    if (status) {
      if (status === 'Available') return 'success';
      else if (status === 'Sold' || status === 'Lent') return 'warn';
    } else return '';
  }

  deliverableIndicatorPillColorClass: () => string = () => {
    let deliverable: boolean = this.product.deliverable;
    if (deliverable == true || deliverable == false) {
      if (deliverable) return 'success';
      else return 'warn';
    } else return '';
  }

}
