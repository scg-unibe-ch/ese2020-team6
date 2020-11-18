import { Component, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { DurationComponent } from '../stage/duration/duration.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { StagableExtention } from '../stagable-extention';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder } from '../../../../models/request/order/order-request-builder.module';
import { HoursRequestExtension } from '../../../../models/request/order/order-request-model.module';
import { HoursResponseExtension } from '../../../../models/response/order/order-response-model.module';

@Component({
  selector: 'pruchase-service',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class PurchaseServiceComponent extends OrderRequestBuilder<HoursRequestExtension, HoursResponseExtension> {

  protected _endpointURLExtention: string = 'order/service/rent';

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    orderService: OrderService
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
      orderService
    );
  }

  protected buildOrderRequest(): HoursRequestExtension {
    return {
      productId: this.product.productId,
      sellerId: this.product.userId,
      paymentMethod: this.getDataValueByStageIndex(1),
      hours: this.getDataValueByStageIndex(0)
    }
  }
}
