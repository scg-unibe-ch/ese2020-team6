import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
export class BuyItemComponent extends StagableExtention implements OnInit {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService
  ) {
    super(componentFactoryResolver, [{
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    },
    {
      title: 'Payment Method',
      component: PaymentMethodComponent,
      componentRef: null
    }],
    route,
    productService,
    userService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.stages[0].componentRef.instance.logger.subscribe((data: any) => {
      this.logData();
    });

  }

  public logData(): void {
    console.log(this.getAllValues(this.dataStorage));
  }
}
