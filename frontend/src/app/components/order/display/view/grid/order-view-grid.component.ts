import { Component, Input } from '@angular/core';
import { Orders, NullOrders } from 'src/app/models/order/order.module';

@Component({
  selector: 'order-view-grid',
  templateUrl: './order-view-grid.component.html',
  styleUrls: ['./order-view-grid.component.scss']
})
export class OrderViewGridComponent {

  @Input()
  path: string = "";

  private _orders: Orders = NullOrders.instance();
  @Input()
  set orders(orders: Orders) {
    this._orders = orders;
  }
  get orders(): Orders {
    return this._orders;
  }

}
