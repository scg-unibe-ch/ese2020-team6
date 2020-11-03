import { Component, OnInit } from '@angular/core';
import { ShippingComponent } from '../stage/shipping/shipping.component';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent implements OnInit {

  private stages: number = 3;
  private currentStage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
