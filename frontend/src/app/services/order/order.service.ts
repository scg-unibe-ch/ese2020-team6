import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PutOrderService } from './put/put-order.service';
import { GetOrderService } from './get/get-order.service';

import { OrderRequestBuilder, OrderRequestModel } from '../../models/request/request.module';
import { OrderResponseModel } from '../../models/response/order/order-response.module';

import { Orders } from '../../models/order/order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private putOrderService: PutOrderService,
    private getOrderService: GetOrderService
  ) { }

  public orderProduct<R extends OrderRequestModel, S extends OrderResponseModel, T extends OrderRequestBuilder<R, S>>(orderInformation: T): Observable<S> {
    return this.putOrderService.orderProduct<R, S, T>(orderInformation);
  }

  public getMyOrders(): Observable<Orders> {
    return this.getOrderService.getMyOrders();
  }

  public getMyProductOrders(): Observable<Orders> {
    return this.getOrderService.getMyProductOrders();
  }
}
