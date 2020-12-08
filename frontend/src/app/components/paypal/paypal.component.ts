import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductAttributes} from '../../../../../backend/src/models/product.model';
//import { Product } from '../models/product/product.model'

declare var paypal;
var productAttributes: ProductAttributes;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product = { 
    price: productAttributes.price,
    description: productAttributes.description,
    img: productAttributes.picture
  };
  paidFor = false;
  constructor() { }

  ngOnInit(): void {
    paypal
      .Button({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description, //change 
                amount: {
                  currency_code: 'CHF',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture(); //entweder capture im frontend oder call is backend mache und dert handle
          this.paidFor = true;
          console.log(order)
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }

}
