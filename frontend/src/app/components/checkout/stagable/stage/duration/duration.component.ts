import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'duration-stage',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent extends StageNDEExtention<number> {

  public getData(): number {
    return null;
  };

  public finalizeStages(): void {
    this.emitData();
    super.finalizeStages();
  }
}
