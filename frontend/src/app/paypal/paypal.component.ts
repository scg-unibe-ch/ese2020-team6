import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductAttributes} from '../../../../backend/src/models/product.model';
//import { Product } from '../models/product/product.model'

declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  //Hardcoded product
  product = {
    price:this.ProductAttributes.price,
    description: 'New thing to buy'
    //img: 'assets/picture.jpg'
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
                description: this.product.description,
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
