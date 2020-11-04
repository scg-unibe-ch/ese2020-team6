import { Component, Output, EventEmitter } from '@angular/core';
import { StageNavigationEmitter } from './stage-navigation-emitter';

@Component({
  selector: 'stage-content',
  templateUrl: './stage-content.component.html',
  styleUrls: ['./stage-content.component.scss']
})
export class StageContentComponent extends StageNavigationEmitter {

  @Output()
  nextStageEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  previousStageEmitter: EventEmitter<void> = new EventEmitter<void>();

}
