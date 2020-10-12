
import { ProductService } from '../../../../services/product/product.service';
import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.scss']
})
export class ProductDetailComponentComponent implements OnInit {
  @Input() data: any;
  id: number;


  constructor(private route: ActivatedRoute, productService: ProductService) {
    this.route.params.subscribe( params => this.data = productService.get(params.id) );
   }

  ngOnInit(): void {
    console.log(this.data);
  }

}
