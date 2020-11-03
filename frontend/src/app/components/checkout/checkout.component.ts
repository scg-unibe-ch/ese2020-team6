import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CheckoutRouteParametersModel } from '../../models/checkout/checkout-route-parameters.model';
import { ProductModel, NullProduct } from '../../models/product/product.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private product: ProductModel = new NullProduct();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((parameters: CheckoutRouteParametersModel) => {
      let productId: number = parameters.productId;
      this.productService.getProductById(productId)
      .subscribe((product: ProductModel) => this.product = product);
    });
  }

}
