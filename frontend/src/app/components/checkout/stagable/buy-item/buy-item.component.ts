import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { StageModel } from '../../../../models/checkout/stage/stage.model'
import { StagesDirective } from '../stage/stages.directive';
import { Stagable } from '../stagable';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-buy-item',
  templateUrl: '../stagable.component.html',
  styleUrls: ['./buy-item.component.scss']
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
      title: 'Shipping',
      component: ShippingComponent,
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
