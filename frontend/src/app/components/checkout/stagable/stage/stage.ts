import { Component, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { StageContentComponent } from './stage-content.component';
import { StageNavigationEmitter } from './stage-navigation-emitter';

@Component({
  selector: 'stage',
  template: ''
})
export abstract class Stage<T> extends StageNavigationEmitter implements AfterViewInit {

  @Output()
  nextStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  previousStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  dataEmitter: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild(StageContentComponent)
  stageContent: StageContentComponent;

  public ngAfterViewInit(): void {
    this.stageContent.nextStageEmitter.subscribe(() => this.nextStage());
    this.stageContent.previousStageEmitter.subscribe(() => this.previousStage());
  }

  public nextStage(): void {
    super.nextStage();
    this.dataEmitter.emit(this.getData());
  }

  protected abstract getData(): T;

}
