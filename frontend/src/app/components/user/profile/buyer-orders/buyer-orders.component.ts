import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { Orders, NullOrders } from 'src/app/models/order/order.module';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'buyer-orders',
  templateUrl: './buyer-orders.component.html'
})
export class BuyerOrdersComponent implements OnInit {

  private _orders: Orders = NullOrders.instance();
  set orders(orders: Orders) {
    this._orders = orders;
  }
  get orders(): Orders {
    return this._orders;
  }

  public currentContent: ProfileNavigationElementModel;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe(
      (navigationElement: ProfileNavigationElementModel) => {
        this.currentContent = navigationElement;
      });
    this.orderService.getMyOrders().subscribe((orders: Orders) => {
      this.orders = orders;
    });
  }

}
