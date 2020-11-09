import { Component, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { DurationComponent } from '../stage/duration/duration.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder } from '../../../../models/request/order/order-request-builder.module';
import { ShippingHoursRequestExtension } from '../../../../models/request/order/order-request-model.module';
import { ShippingHoursResponseExtension } from '../../../../models/response/order/order-response-model.module';

@Component({
  selector: 'rent-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class RentItemComponent extends OrderRequestBuilder<ShippingHoursRequestExtension, ShippingHoursResponseExtension> {

  protected _endpointURLExtention: string = 'order/item/rent';

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
          title: 'Shipping',
          component: ShippingComponent,
          componentRef: null
        },
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

  protected buildOrderRequest(): ShippingHoursRequestExtension {
    return {
      productId: this.product.productId,
      paymentMethod: this.getDataValueByStageIndex(2),
      shippingAddress: this.getDataValueByStageIndex(0),
      hours: this.getDataValueByStageIndex(1)
    }
  }
}
