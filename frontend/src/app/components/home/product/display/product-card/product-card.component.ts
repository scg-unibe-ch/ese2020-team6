import { Component , Input } from '@angular/core';
import { ProductModel } from '../../../../../models/product/product.model';

@Component({
  selector: 'app-product-card',
  template: ``
})
export class ProductCardComponent {

  @Input()
  product: ProductModel;

  @Input()
  path: string = "";

  statusIndicatorPillColorClass: () => string = () => {
    let status: string = this.product.status;
    if (status) {
      if (status === 'Available') return 'success';
      else if (status === 'Sold' || status === 'Lent') return 'warn';
    } else return '';
  }

  deliverableIndicatorPillColorClass: () => string = () => {
    let isDeliverable: boolean = this.product.isDeliverable;
    if (isDeliverable == true || isDeliverable == false) {
      if (isDeliverable) return 'success';
      else return 'warn';
    } else return '';
  }

  get priceLabel(): string {
    if (this.product.productType === 'Service' || this.product.offerType === 'Rent') return '$/h';
    else return '$';
  }

  get routerLink(): Array<any> {
    if (this.path === '') return ['/product/information', this.product.productId];
    else return ['/product/information', this.product.productId, this.path];
  }

}
