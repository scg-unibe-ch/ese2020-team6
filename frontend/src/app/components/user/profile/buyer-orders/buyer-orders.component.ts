import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { UserModel } from 'src/app/models/user/user.model';
import { ProductModel } from 'src/app/models/product/product.model';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { Orders } from 'src/app/models/order/order.model';

@Component({
  selector: 'buyer-orders',
  templateUrl: './buyer-orders.component.html'
})
export class BuyerOrdersComponent implements OnInit {

  public orders: Orders;
  public currentContent: ProfileNavigationElementModel;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private userService: UserService
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
