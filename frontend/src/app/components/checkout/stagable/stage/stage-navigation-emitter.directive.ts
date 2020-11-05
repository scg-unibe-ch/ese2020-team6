import { Directive, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[stage-navigation-emitter]'
})
export class StageNavigationEmitter {

  @Output()
  public nextStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public previousStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public finalizeStagesEmitter: EventEmitter<void> = new EventEmitter<void>();

  public nextStage(): void {
    this.nextStageEmitter.emit();
  }

  public previousStage(): void {
    this.previousStageEmitter.emit();
  }

  public finalizeStages(): void {
    this.finalizeStagesEmitter.emit();
  }
}
