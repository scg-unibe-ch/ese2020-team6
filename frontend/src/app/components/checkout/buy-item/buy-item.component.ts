import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { StagesDirective } from '../stage/stages.directive';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent implements OnInit {

  @ViewChild(StagesDirective, {static: true})
  stagesDirective: StagesDirective;

  public stages: Array<StageModel> = [
    {
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    },
    {
      title: 'Shipping',
      component: ShippingComponent,
      componentRef: null
    }
  ]

  public currentStage: StageModel = this.stages[0];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    const viewContainerRef = this.stagesDirective.viewContainerRef;
    viewContainerRef.clear();

    this.stages.forEach((stage: StageModel, index: number) => {
      const stageComponent = stage.component;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(stageComponent);

      stage.componentRef = viewContainerRef.createComponent(componentFactory);
      stage.componentRef.instance.something = "hi";
      console.log(stage.componentRef.instance.something);

    });
  }

}
