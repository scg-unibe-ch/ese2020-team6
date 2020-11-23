import { Directive, Output, EventEmitter} from '@angular/core';
import { StageNEmitter } from './stage-navigation-emitter.directive';

@Directive({
  selector: '[stage-navigation-data-emitter]'
})
export abstract class StageNDEmitter<T> extends StageNEmitter {

  @Output()
  dataEmitter: EventEmitter<T> = new EventEmitter<T>();

  public emitData(): void {
    this.dataEmitter.emit(this.getData());
  }

  protected abstract getData(): T;

  public nextStage(): void {
    this.emitData();
    super.nextStage();
  }

  public finalizeStages(): void {
    this.emitData();
    super.finalizeStages();
  }

}
