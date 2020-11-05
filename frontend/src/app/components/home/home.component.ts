import { Component, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { ProductModel } from '../../models/product/product.model';
import { Themable } from '../../models/theme/themable';
import { ThemeService } from '../../services/theme/theme.service';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Themable {

  public products: Array<ProductModel> = new Array();
  public isLoggedIn = false;
  showDropdown: any;
  newReload: any;

  constructor(
    productService: ProductService,
    userService: UserService,
    themeService: ThemeService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    super(themeService);

    productService.getAllAcceptedProducts().subscribe((products: Array<ProductModel>) => this.products = products);
    this.isLoggedIn = userService.isLoggedIn;
  }

  public show(tpl): void {
    const configs = new OverlayConfig({
    hasBackdrop: true,
    });
    configs.positionStrategy = this.overlay.position()
    .global()
    .centerHorizontally()
    .centerVertically();
    const overlayRef = this.overlay.create(configs);
    overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }
}
