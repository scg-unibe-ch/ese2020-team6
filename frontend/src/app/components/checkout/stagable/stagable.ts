import { Component, OnInit, ViewChild, ComponentFactoryResolver, EventEmitter, Type } from '@angular/core';
import { Themable } from '../../../models/theme/themable';
import { ThemeService } from '../../../services/theme/theme.service';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { StagesDirective } from './stage/stages.directive';
import { Stage } from './stage/stage';

@Component({
  selector: 'app-stagable',
  template: ''
})
export class Stagable extends Themable implements OnInit {

  @ViewChild(StagesDirective, {static: true})
  stagesDirective: StagesDirective;

  protected stages: Array<StageModel> = new Array<StageModel>();
  private currentStageIndex: number = 0;
  private currentStage: StageModel = this.stages[this.currentStageIndex];

  protected stagesEmitters: { next: Array<[EventEmitter<void>, number]>, previous: Array<[EventEmitter<void>, number]> } = {
    next: new Array<[EventEmitter<void>, number]>(),
    previous: new Array<[EventEmitter<void>, number]>()
  }

  protected dataEmitters: Array<[EventEmitter<any>, number]> = new Array<[EventEmitter<any>, number]>();
  protected dataStorage: Array<[any, number]> = new Array<[any, number]>();

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

    this.stages.forEach((stage: StageModel, stageIndex: number) => {
      const stageComponent: Type<Stage<any>> = stage.component;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(stageComponent);

      stage.componentRef = viewContainerRef.createComponent(componentFactory);
      this.pushEmitters(stage, stageIndex);
    });

    this.assignEmitterMethods();
  }

  private pushEmitters(stage: StageModel, stageIndex: number): void {
    this.pushStagesEmitters(stage, stageIndex);
    this.pushDataEmmiters(stage, stageIndex);
  }

  private pushStagesEmitters(stage: StageModel, stageIndex: number): void {
    this.stagesEmitters.next.push([
      stage.componentRef.instance.nextStageEmitter,
      stageIndex
    ]);
    this.stagesEmitters.previous.push([
      stage.componentRef.instance.previousStageEmitter,
      stageIndex
    ]);
  }

  private pushDataEmmiters(stage: StageModel, stageIndex: number): void {
    this.dataEmitters.push([
      stage.componentRef.instance.dataEmitter,
      stageIndex
    ])
  }

  private assignEmitterMethods(): void {
    this.assignNextEmitterMethods();
    this.assignPreviousEmitterMethods();
    this.assignDataEmitterMethods();
  }

  private assignNextEmitterMethods(): void {
    let nextStagesEmitters: Array<[EventEmitter<void>, number]> = this.stagesEmitters.next;
    this.assignEmitterMethod(this.nextStage, nextStagesEmitters);
  }

  private assignPreviousEmitterMethods(): void {
    let previousStagesEmitters: Array<[EventEmitter<void>, number]> = this.stagesEmitters.previous;
    this.assignEmitterMethod(this.previousStage, previousStagesEmitters);
  }

  private assignDataEmitterMethods(): void {
    this.assignEmitterMethod(this.setData, this.dataEmitters);
  }

  private assignEmitterMethod(emitterMethod: (stageIndex: number, data?: any) => void, emitters: Array<[EventEmitter<any>, number]>): void {
    emitters.forEach((emitterTupel: [EventEmitter<any>, number]) => {
      let emitter: EventEmitter<any> = emitterTupel[0];
      let stageIndex: number = emitterTupel[1];
      emitter.subscribe((data: any) => {
        emitterMethod(stageIndex, data);
      })
    });
  }

  private nextStage: (stageIndex: number, data?: any) => void = (stageIndex: number): void => {
    if (this.currentStageIndex + 1 < this.stages.length) {
      this.currentStageIndex += 1;
      this.updateStage();
    }
  }

  private previousStage: (stageIndex: number, data?: any) => void = (stageIndex: number): void => {
    if (this.currentStageIndex > 0) {
      this.currentStageIndex -= 1;
      this.updateStage();
    }
  }

  private setData: (stageIndex: number, data?: any) => void = (stageIndex: number, data: any): void => {
    let existingData: any = this.getValueByStageIndex(this.dataStorage, stageIndex);
    if (existingData) {
      this.setValueByStageIndex(this.dataStorage, stageIndex, data);
    } else {
      this.dataStorage.push([
        data,
        stageIndex
      ])
    }
  }

  private updateStage(): void {
    if (this.currentStageIndex + 1 <= this.stages.length && this.currentStageIndex >= 0) {
      this.currentStage = this.stages[this.currentStageIndex];
    } else throw 'Stage not available!'
  }

  protected getValueByStageIndex(array: Array<[any, number]>, stageIndex: number): any {
    let stageIndices: Array<number> = array.map((valueTupel: [any, number]) => valueTupel[1]);
    let valueIndex: number = stageIndices.indexOf(stageIndex);
    if (valueIndex >= 0) return array[valueIndex][0];
    return null;
  }

  protected setValueByStageIndex(array: Array<[any, number]>, stageIndex: number, data: any): void {
    let stageIndices: Array<number> = array.map((valueTupel: [any, number]) => valueTupel[1]);
    let valueIndex: number = stageIndices.indexOf(stageIndex);
    if (valueIndex >= 0) {
      array[valueIndex][0] = data;
    } else throw 'Entry for stageIndex ' + stageIndex + ' does not exists!';
  }

  protected getAllValues(array: Array<[any, number]>): Array<any> {
    return array.map((valueTupel: [any, number]) => valueTupel[0]);
  }
}
