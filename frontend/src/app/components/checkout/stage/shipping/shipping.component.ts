import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shipping-stage',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  @Input('something')
  something;

  constructor() { }

  ngOnInit(): void {
  }

}
