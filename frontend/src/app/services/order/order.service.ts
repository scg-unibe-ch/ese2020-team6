import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PutOrderService } from './put/put-order.service';
import { GetOrderService } from './get/get-order.service';

import { OrderRequestBuilder } from '../../models/request/order/order-request-builder.module';
import { OrderRequestModel } from '../../models/request/order/order-request-model.module';
import { OrderResponseModel } from '../../models/response/order/order-response-model.module';

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
}
