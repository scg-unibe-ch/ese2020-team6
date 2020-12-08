import { Component, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { DurationComponent } from '../stage/duration/duration.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder, ShippingHoursRequestExtension } from '../../../../models/request/request.module';
import { ShippingHoursResponseExtension } from '../../../../models/response/order/order-response.module';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'rent-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class RentItemComponent extends OrderRequestBuilder<ShippingHoursRequestExtension, ShippingHoursResponseExtension> {

  protected _endpointURLExtention: string = 'product/order/item/rent';

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    orderService: OrderService,
    router: Router,
    popupService: PopupService
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
      orderService,
      router,
      popupService
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
