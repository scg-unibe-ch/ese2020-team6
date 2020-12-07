import { Component, Input } from '@angular/core';
import { Orders, NullOrders } from 'src/app/models/order/order.module';

@Component({
  selector: 'order-view-list',
  templateUrl: './order-view-list.component.html',
  styleUrls: ['./order-view-list.component.scss']
})
export class OrderViewListComponent {

  @Input()
  path = '';

  private _orders: Orders = NullOrders.instance();
  @Input()
  set orders(orders: Orders) {
    this._orders = orders;
  }
  get orders(): Orders {
    return this._orders;
  }

}
