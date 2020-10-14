import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {
  @Input() data: any;
  @Input() isPreview = false;
  id: number;


  constructor(private route: ActivatedRoute, productService: ProductService) {
    this.route.params.subscribe( params => this.data = productService.get(params.id) );
   }

  ngOnInit(): void {
  }
}
