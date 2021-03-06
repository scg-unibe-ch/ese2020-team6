import { Component } from '@angular/core';
import { StageNDEExtention } from '../stage-navigation-data-emitter-extention.directive';

@Component({
  selector: 'payment-method-stage',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent extends StageNDEExtention<string> {
  public options: Array<[string, string]> = [
    ['Wallet', 'wallet'],
    //['PayPal', 'paypal']
  ]
  public paymentMethod: string;

  public getData(): string {
    return this.paymentMethod;
  };

  protected onProductLoad(): void {}

  protected onSellerLoad(): void {}

  protected onBuyerLoad(): void {}
}
