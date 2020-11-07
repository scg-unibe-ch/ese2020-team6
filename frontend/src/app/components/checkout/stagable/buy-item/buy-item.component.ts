import { Component, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { StageModel } from '../../../../models/checkout/stage/stage.model'
import { StagesDirective } from '../stages.directive';
import { StagableExtention } from '../stagable-extention';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { CheckoutRouteParametersModel } from '../../../../models/checkout/checkout-route-parameters.model';

@Component({
  selector: 'buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class BuyItemComponent extends StagableExtention {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService
  ) {
    super(componentFactoryResolver, [
    {
      title: 'Payment Method',
      component: PaymentMethodComponent,
      componentRef: null
    },
    {
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    }],
    route,
    productService,
    userService);
  }
}
