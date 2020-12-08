import { Component, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ValueLoader } from 'src/app/services/service.module';
import { NullProducts, Products } from 'src/app/models/product/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public products: Products = NullProducts.instance();
  public isLoggedIn = false;
  showDropdown: any;
  newReload: any;

  constructor(
    productService: ProductService,
    userService: UserService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    productService.getAllAcceptedProducts().subscribe((products: Products) => this.products = products);
    userService.subscribe(new ValueLoader(() => this.isLoggedIn = true, (err: any) => this.isLoggedIn = false));
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
