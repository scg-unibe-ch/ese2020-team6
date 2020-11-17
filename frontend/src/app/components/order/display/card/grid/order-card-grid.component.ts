import { Component } from '@angular/core';
import { OrderCardDirective } from '../order-card.directive';

@Component({
  selector: 'order-card-grid',
  templateUrl: './order-card-grid.component.html',
  styleUrls: ['./order-card-grid.component.scss']
})
export class OrderCardGridComponent extends OrderCardDirective {}
