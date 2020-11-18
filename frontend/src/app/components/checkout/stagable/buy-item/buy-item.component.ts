import { Component, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder } from '../../../../models/request/order/order-request-builder.module';
import { ShippingRequestExtension } from '../../../../models/request/order/order-request-model.module';
import { ShippingResponseExtension } from '../../../../models/response/order/order-response-model.module';

@Component({
  selector: 'buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class BuyItemComponent extends OrderRequestBuilder<ShippingRequestExtension, ShippingResponseExtension> {

  protected _endpointURLExtention: string = 'order/item/buy';

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

  protected buildOrderRequest(): ShippingRequestExtension {
    return {
      productId: this.product.productId,
      sellerId: this.product.userId,
      paymentMethod: this.getDataValueByStageIndex(1),
      shippingAddress: this.getDataValueByStageIndex(0)
    }
  }
}
