import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.scss']
})
export class ProductDetailComponentComponent implements OnInit {
  @Input() data: any;
 

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.data);
  }

}
