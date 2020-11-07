import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'payment-method-stage',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent extends StageNDEExtention<string> {
  public getData():string {return ''};
}
