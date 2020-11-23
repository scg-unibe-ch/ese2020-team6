import { Component, Input } from '@angular/core';
import { Orders } from 'src/app/models/order/order.model';

@Component({
  selector: 'order-view-grid',
  templateUrl: './order-view-grid.component.html',
  styleUrls: ['./order-view-grid.component.scss']
})
export class OrderViewGridComponent {

  @Input()
  path: string = "";

  private _orders: Orders = Orders.NullOrders;
  @Input()
  set orders(orders: Orders) {
    this._orders = orders;
  }
  get orders(): Orders {
    return this._orders;
  }

}
