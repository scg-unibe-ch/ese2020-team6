import { Component, OnInit, Input } from '@angular/core';
import { Orders } from '../../../../models/order/order.model';

@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  @Input()
  public orders: Orders;

  constructor() { }

  ngOnInit(): void {
  }

}
