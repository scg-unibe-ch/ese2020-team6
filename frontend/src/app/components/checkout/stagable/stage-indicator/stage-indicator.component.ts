import { Component, OnInit, Input } from '@angular/core';
import { StageModel } from '../../../../models/checkout/stage/stage.model';
import { ThemeService } from '../../../../services/theme/theme.service';
import { Themable } from '../../../../models/theme/themable';


@Component({
  selector: 'stage-indicator',
  templateUrl: './stage-indicator.component.html',
  styleUrls: ['./stage-indicator.component.scss']
})
export class StageIndicatorComponent extends Themable implements OnInit {

  @Input()
  stages: Array<StageModel> = new Array<StageModel>();

  @Input()
  currentStageIndex: number;

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
  }

  ngOnInit(): void {
  }

  get stageTitles(): Array<string> {
    return this.stages.map((stage: StageModel) => stage.title);
  }

  get stops(): Array<[string, number]> {
    return this.stages.map((stage: StageModel, index: number) => [stage.title, index]);
  }

  get connectors(): Array<number> {
    return this.stages.reduce((result: Array<number>, stage: StageModel, index: number) => {
      if (index + 1 < this.stages.length) result.push(index);
      return result;
    }, []);
  }

  public getIndexOfStage(stage: StageModel): number {
    return this.stages.indexOf(stage);
  }

  public getCircleX(stage: StageModel): number {
    return 50 + 80 * (this.getIndexOfStage(stage));
  }

  public isVisited(index: number): string {
    if (index < this.currentStageIndex) return 'visited';
    else return 'default';
  }

  public isActive(index: number): string {
    if (index == this.currentStageIndex) return 'active';
    else return null;
  }
}
