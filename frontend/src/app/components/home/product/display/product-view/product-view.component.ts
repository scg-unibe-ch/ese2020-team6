import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewContainerRef } from '@angular/core';
import { ProductModel } from '../../../../../models/product/product.model';
import { Themable } from '../../../../../models/theme/themable';
import { ThemeService } from '../../../../../services/theme/theme.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent extends Themable {

  @Input()
  path = '';

  @Input()
  products: Array<ProductModel>;

  private displayList = true;
  showDropdown: boolean;
  newReload: boolean;


  constructor(
    themeService: ThemeService,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {
    super(themeService);
  }

  public switchView(): void {
    this.displayList = !this.displayList;
  }

  get isList(): boolean {
    return this.displayList;
  }

  get hasProducts(): boolean {
    if (this.products) { return this.products.length !== 0; }
    else { return false; }
  }

  public searchProduct(tpl): void {
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
