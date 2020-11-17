import { Component } from '@angular/core';
import { ProductCardDirective } from '../product-card.directive';

@Component({
  selector: 'app-product-card-grid',
  templateUrl: './product-card-grid.component.html',
  styleUrls: ['./product-card-grid.component.scss']
})
export class ProductCardGridComponent extends ProductCardDirective {}
