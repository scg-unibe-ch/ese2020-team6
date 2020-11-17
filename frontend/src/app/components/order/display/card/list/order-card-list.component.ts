import { Component } from '@angular/core';
import { OrderCardDirective } from '../order-card.directive';

@Component({
  selector: 'order-card-list',
  templateUrl: './order-card-list.component.html',
  styleUrls: ['./order-card-list.component.scss']
})
export class OrderCardListComponent extends OrderCardDirective {}
