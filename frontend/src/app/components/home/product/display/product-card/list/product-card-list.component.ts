// Packages
import { Component, Input } from '@angular/core';
// Models
import { ProductModel } from '../../../../../../models/product/product.model';
// Components
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['../product-card.component.scss']
})
export class ProductCardListComponent extends ProductCardComponent {

  get statusPillColorClass(): string {
    return this.product.status.toLowerCase();
  }

  detailsPillColorClass(pillContent: string): string {
    return pillContent ? 'faded' : 'fainted';
  }

}
