import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';
import { ThemeService } from '../../../../../services/theme/theme.service';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['../product-information.component.scss']
})
export class PurchaseProductComponent extends ProductInformationBase {

  public showPurchaseForm: boolean = false;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private router: Router,
    userService: UserService,
    themeService: ThemeService
  ) {
    super(route, productService, userService, themeService);
  }

  public togglePurchase(): void {
    this.showPurchaseForm = !this.showPurchaseForm;
  }

  get isForSale(): boolean {
    if (this.product.offerType === 'Rent' || this.product.productType === 'Service') return false;
    else return true;
  }
}
