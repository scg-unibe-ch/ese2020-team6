import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PutOrderService } from './put/put-order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends PutOrderService {

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);
  }
}
