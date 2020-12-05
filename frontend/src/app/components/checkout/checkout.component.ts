import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { CheckoutRouteParametersModel } from '../../models/checkout/checkout-route-parameters.model';
import { ProductModel, NullProduct } from '../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../models/user/cut-user.model';
import { StagableExtention } from './stagable/stagable-extention';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public product: ProductModel = NullProduct.instance();
  public seller: CutUserModel = new NullCutUser();

  public errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parameters: CheckoutRouteParametersModel) => {
      let productId: number = parameters.productId;
      this.productService.getProductById(productId)
      .subscribe((product: ProductModel) => {
        this.product = product;
        let sellerId: number = product.sellerId;
        this.userService.getUserById(sellerId).subscribe((seller: CutUserModel) => {
          this.seller = seller;
        });
      });
    });
  }

  get priceLabel(): string {
    if (this.product.productType === 'Service' || this.product.offerType === 'Rent') { return '$/h'; }
    else { return '$'; }
  }

  componentAdded(stagable: StagableExtention) {
    stagable.errorEmitter.subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
    });
  }

}
