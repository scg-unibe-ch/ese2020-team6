import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'stage',
  template: ''
})
export abstract class Stage<T> implements OnInit {

  @Output()
  nextStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  previousStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  dataEmitter: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  public nextStage(): void {
    this.nextStageEmitter.emit();
    this.dataEmitter.emit(this.getData());
  }

  public previousStage(): void {
    this.previousStageEmitter.emit();
  }

  protected abstract getData(): T;

}
