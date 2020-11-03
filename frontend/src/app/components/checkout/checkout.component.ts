import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { CheckoutRouteParametersModel } from '../../models/checkout/checkout-route-parameters.model';
import { ProductModel, NullProduct } from '../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../models/user/cut-user.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private product: ProductModel = new NullProduct();
  private seller: CutUserModel = new NullCutUser();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((parameters: CheckoutRouteParametersModel) => {
      let productId: number = parameters.productId;
      this.productService.getProductById(productId)
      .subscribe((product: ProductModel) => {
        this.product = product;
        let sellerId: number = product.userId;
        this.userService.getUserById(sellerId).subscribe((seller: CutUserModel) => {
          this.seller = seller;
        })
      });
    });
  }

}
