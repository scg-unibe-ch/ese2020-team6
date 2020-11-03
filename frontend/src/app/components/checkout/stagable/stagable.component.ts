import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Themable } from '../../../models/theme/themable';
import { ThemeService } from '../../../services/theme/theme.service';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { StagesDirective } from './stage/stages.directive';

@Component({
  selector: 'app-stagable',
  template: ''
})
export class StagableComponent extends Themable implements OnInit {

  @ViewChild(StagesDirective, {static: true})
  stagesDirective: StagesDirective;

  private stages: Array<StageModel> = new Array<StageModel>();
  private currentStage: StageModel = this.stages[0];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    themeService: ThemeService,
    stages: Array<StageModel>
  ) {
    super(themeService);

    if (stages.length < 2) throw "You need to have at least two stages!";
    else {
      this.stages = stages;
      this.currentStage = this.stages[0];
    }
  }

  public ngOnInit(): void {
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
