import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html'
})
export class PurchaseProductComponent extends ProductInformationBase {

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
  ) {
    super(route, productService, userService);
  }

  get isForSale(): boolean {
    if (this.product.offerType === 'Rent' || this.product.productType === 'Service') return false;
    else return true;
  }
}
