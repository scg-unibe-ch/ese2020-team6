import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StageNavigationDataEmitter } from '../stage-navigation-data-emitter.directive';

@Component({
  selector: 'payment-method-stage',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent extends StageNavigationDataEmitter<string> {
  public getData():string {return ''};
}
