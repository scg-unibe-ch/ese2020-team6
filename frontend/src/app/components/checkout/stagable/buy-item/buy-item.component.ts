import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { PaymentMethodComponent } from '../stage/payment-method/payment-method.component';
import { StageModel } from '../../../../models/checkout/stage/stage.model'
import { StagesDirective } from '../stages.directive';
import { Stagable } from '../stagable';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['../stagable.component.scss']
})
export class BuyItemComponent extends Stagable implements OnInit {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    themeService: ThemeService,
  ) {
    super(componentFactoryResolver, themeService, [{
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    },
    {
      title: 'Payment Method',
      component: PaymentMethodComponent,
      componentRef: null
    }]);
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
