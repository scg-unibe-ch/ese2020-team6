import { Component, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestBuilder, ShippingRequestExtension } from 'src/app/models/request/request.module';
import { ShippingResponseExtension } from '../../../../models/response/order/order-response.module';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class BuyItemComponent extends OrderRequestBuilder<ShippingRequestExtension, ShippingResponseExtension> {

  protected _endpointURLExtention: string = 'product/order/item/buy';

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

  protected buildOrderRequest(): ShippingRequestExtension {
    return {
      productId: this.product.productId,
      paymentMethod: this.getDataValueByStageIndex(1),
      shippingAddress: this.getDataValueByStageIndex(0)
    }
  }
}
