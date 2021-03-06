import { Component, Input } from '@angular/core';
import { Orders, NullOrders } from 'src/app/models/order/order.module';

@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {
  @Input()
  public path: string = '';

  private _orders: Orders = NullOrders.instance();
  @Input()
  set orders(orders: Orders) {
    this._orders = orders;
  }
  get orders(): Orders {
    return this._orders;
  }

  private displayList = true;

  public switchView(): void {
    this.displayList = !this.displayList;
  }

  get isList(): boolean {
    return this.displayList;
  }

  get hasOrders(): boolean {
    return this.orders.hasOrders;
  }

}
