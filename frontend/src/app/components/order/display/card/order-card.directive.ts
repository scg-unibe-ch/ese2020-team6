import { Directive , Input } from '@angular/core';
import { Order, NullOrder } from '../../../../models/order/order.model';

@Directive({
  selector: '[appOrderCard]'
})
export class OrderCardDirective {

  private _order: Order = NullOrder.instance();
  @Input()
  set order(order: Order) {
    this._order = order;
  }
  get order(): Order {
    return this._order;
  }

  @Input()
  path: '';

  get routerLink(): Array<any> {
    if (this.path === '') { return ['/product/information', this.order.productId]; }
    else { return ['/product/information', this.order.productId, this.path]; }
  }

}
