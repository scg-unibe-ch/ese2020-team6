import { Component, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationComponent } from '../stage/duration/duration.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder, HoursRequestExtension } from 'src/app/models/request/request.module';
import { HoursResponseExtension } from '../../../../models/response/order/order-response.module';

@Component({
  selector: 'pruchase-service',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class PurchaseServiceComponent extends OrderRequestBuilder<HoursRequestExtension, HoursResponseExtension> {

  protected _endpointURLExtention: string = 'product/order/service/rent';

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    orderService: OrderService,
    router: Router
  ) {
    super(
      componentFactoryResolver,
      [
        {
          title: 'Duration of Rental',
          component: DurationComponent,
          componentRef: null
        },
        {
          title: 'Payment Method',
          component: PaymentMethodComponent,
          componentRef: null
        }
      ],
      route,
      productService,
      userService,
      orderService,
      router
    );
  }

  protected buildOrderRequest(): HoursRequestExtension {
    return {
      productId: this.product.productId,
      paymentMethod: this.getDataValueByStageIndex(1),
      hours: this.getDataValueByStageIndex(0)
    }
  }
}
