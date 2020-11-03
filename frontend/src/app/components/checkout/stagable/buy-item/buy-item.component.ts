import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { StageModel } from '../../../../models/checkout/stage/stage.model'
import { StagesDirective } from '../stage/stages.directive';
import { StagableComponent } from '../stagable.component';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent extends StagableComponent {

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
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    }]);
  }
}
