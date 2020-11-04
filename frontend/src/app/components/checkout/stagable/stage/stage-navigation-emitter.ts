import { EventEmitter } from '@angular/core';

export abstract class StageNavigationEmitter {

  nextStageEmitter: EventEmitter<void>;
  previousStageEmitter: EventEmitter<void>;

  public nextStage(): void {
    this.nextStageEmitter.emit();
  }

  public previousStage(): void {
    this.previousStageEmitter.emit();
  }
}
