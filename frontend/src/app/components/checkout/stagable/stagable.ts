import { Directive, OnInit, ViewChild, ComponentFactoryResolver, EventEmitter, Type } from '@angular/core';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { StagesDirective } from './stages.directive';
import { StageNDEmitter } from './stage/stage-navigation-data-emitter.directive';

@Directive({
  selector: '[stagable]'
})
export abstract class Stagable implements OnInit {

  @ViewChild(StagesDirective, {static: true})
  stagesDirective: StagesDirective;

  public stages: Array<StageModel> = new Array<StageModel>();
  public currentStageIndex: number = 0;
  private currentStage: StageModel = this.stages[this.currentStageIndex];

  protected stagesEmitters: {
    next: Array<[EventEmitter<void>, number]>,
    previous: Array<[EventEmitter<void>, number]>,
    finalize: Array<[EventEmitter<void>, number]>
  } = {
    next: new Array<[EventEmitter<void>, number]>(),
    previous: new Array<[EventEmitter<void>, number]>(),
    finalize: new Array<[EventEmitter<void>, number]>()
  }

  protected dataEmitters: Array<[EventEmitter<any>, number]> = new Array<[EventEmitter<any>, number]>();
  protected dataStorage: Array<[any, number]> = new Array<[any, number]>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    stages: Array<StageModel>
  ) {
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
      const stageComponent: Type<StageNDEmitter<any>> = stage.component;
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
    this.stagesEmitters.finalize.push([
      stage.componentRef.instance.finalizeStagesEmitter,
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
    this.assignFinalizeEmitterMethods();
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

  private assignFinalizeEmitterMethods(): void {
    let finalizeStagesEmitters: Array<[EventEmitter<void>, number]> = this.stagesEmitters.finalize;
    this.assignEmitterMethod(this.finalize, finalizeStagesEmitters);
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

  protected abstract finalize: (stageIndex: number, data?: any) => void;

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

  protected getAllDataValues(): Array<any> {
    return this.getAllValues(this.dataStorage);
  }

  protected getDataValueByStageIndex(stageIndex: number): any {
    return this.getValueByStageIndex(this.dataStorage, stageIndex);
  }
}
