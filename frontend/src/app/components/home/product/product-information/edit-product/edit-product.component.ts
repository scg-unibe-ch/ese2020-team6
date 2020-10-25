import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends ProductInformationBase {

  private overlayRef: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    super(route, productService, userService);
  }

  public deleteProduct(): void {
    this.productService.deleteProduct(this.product.productId).subscribe(
      product => console.log(product));
    this.router.navigate(['/user/profile/myproducts']);
    this.overlayRef.dispose();
  }

  public openWithTemplate(tpl: TemplateRef<any>) {
    const configs = new OverlayConfig({
     hasBackdrop: true,
     });
    configs.positionStrategy = this.overlay.position()
     .global()
     .centerHorizontally()
     .centerVertically();
    const overlayRef = this.overlay.create(configs);
    this.overlayRef = overlayRef;
    overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
  }

  public doNothing(tplClose: TemplateRef<any>) {
    this.overlayRef.dispose();
  }
}
