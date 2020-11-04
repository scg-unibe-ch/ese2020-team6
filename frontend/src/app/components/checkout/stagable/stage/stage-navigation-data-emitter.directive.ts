import { Directive, Output, EventEmitter} from '@angular/core';
import { StageNavigationEmitter } from './stage-navigation-emitter.directive';

@Directive({
  selector: '[stage-navigation-data-emitter]'
})
export abstract class StageNavigationDataEmitter<T> extends StageNavigationEmitter {

  @Output()
  dataEmitter: EventEmitter<T> = new EventEmitter<T>();

  public emitData(): void {
    this.dataEmitter.emit(this.getData());
  }

  protected abstract getData(): T;

}