import { Component, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { DurationComponent } from '../stage/duration/duration.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { StagableExtention } from '../stagable-extention';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'rent-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class RentItemComponent extends StagableExtention {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService
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
      userService
    );
  }

  protected finalize: (stageIndex: number, data?: any) => void = (stageIndex: number): void => {
    console.log(stageIndex);
  }
}
