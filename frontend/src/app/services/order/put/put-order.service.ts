import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OrderRequestBuilder } from '../../../models/request/order/order-request-builder.module';
import { OrderRequestModel } from '../../../models/request/order/order-request-model.module';
import { OrderResponseModel } from '../../../models/response/order/order-response-model.module';

@Injectable({
  providedIn: 'root'
})
export class PutOrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public orderProduct<R extends OrderRequestModel, S extends OrderResponseModel, T extends OrderRequestBuilder<R, S>>(orderInformation: T): Observable<S> {
    return this.httpClient.put<S>(environment.endpointURL + orderInformation.endpointURLExtention, orderInformation.request);
  }
}
