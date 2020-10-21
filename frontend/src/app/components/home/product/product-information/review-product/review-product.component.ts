import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html'
})
export class ReviewProductComponent extends ProductInformationBase {

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
  ) {
    super(route, productService, userService);
  }
}
