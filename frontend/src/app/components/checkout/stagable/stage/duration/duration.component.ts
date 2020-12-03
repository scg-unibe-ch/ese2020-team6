import { Component } from '@angular/core';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'duration-stage',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent extends StageNDEExtention<number> {

  public duration: number;

  public getData(): number {
    return this.duration;
  };

  protected onProductLoad(): void {}

  protected onSellerLoad(): void {}

  protected onBuyerLoad(): void {}
}
