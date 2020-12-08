import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { OrderService } from 'src/app/services/order/order.service';
import { Orders, NullOrders } from 'src/app/models/order/orders.model';

@Component({
  selector: 'seller-orders',
  templateUrl: './seller-orders.component.html'
})
export class SellerOrdersComponent implements OnInit {

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
    this.orderService.getMyProductOrders().subscribe((orders: Orders) => {
      this.orders = orders;
    });
  }

}
