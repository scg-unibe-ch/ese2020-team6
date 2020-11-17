import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';
import { NumberInputComponent } from '../../../../custom-form/input/number-input/number-input.component';

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
