import { Component, OnInit, Input } from '@angular/core';
import { StageModel } from '../../../../models/checkout/stage/stage.model'


@Component({
  selector: 'stage-indicator',
  templateUrl: './stage-indicator.component.html',
  styleUrls: ['./stage-indicator.component.scss']
})
export class StageIndicatorComponent implements OnInit {

  @Input()
  stages: Array<StageModel> = new Array<StageModel>();

  @Input()
  currentStageIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

}
