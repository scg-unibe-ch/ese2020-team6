import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { GetService } from '../../get-service';
import { environment } from '../../../../environments/environment';

import { Orders, OrderModel } from '../../../models/order/order.model';

import { transformOrder } from '../../../models/order/order.operator';
import { transformAddress } from '../../../models/map/address/address.operator';

@Injectable({
  providedIn: 'root'
})
export class GetOrderService extends GetService {

  constructor(
    httpClient: HttpClient
  ) {
    super('product/order/', httpClient);
  }

  public getMyOrders(): Observable<Orders> {
    return this.get<Array<OrderModel>>('buyer').pipe(share(), transformAddress, transformOrder);
  }

  public getMyProductOrders(): Observable<Orders> {
    return this.get<Array<OrderModel>>('seller').pipe(share(), transformAddress, transformOrder);
  }
}
