import { Component } from '@angular/core';
import { ProductCardDirective } from '../product-card.directive';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.scss']
})
export class ProductCardListComponent extends ProductCardDirective {}
