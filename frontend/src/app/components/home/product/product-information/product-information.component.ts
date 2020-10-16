import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
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
  productId: any;
  productService: ProductService;


  constructor(private route: ActivatedRoute, productService: ProductService) {
    this.productService = productService;
    this.route.params.subscribe(
      params => {
        this.productId = params.id;
        productService.get(params.id).subscribe(product => this.data = product);
      });
   }

  ngOnInit(): void {
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe(
      product => console.log(product));
  }
}
