import { Search } from 'src/app/models/request/search/search.model';
import { SearchProductComponent } from './../../search-product/search-product.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, ViewContainerRef, PipeTransform } from '@angular/core';
import { ProductModel } from '../../../../../models/product/product.model';
import { ProductService } from '../../../../../services/product/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  overlayRef: any;
  @Input() path = '';
  @Input() products: Array<ProductModel>;
  filteredProducts: Array<ProductModel>;
  @ViewChild(SearchProductComponent)
  child: SearchProductComponent;
  public CategoryName;
  private displayList = true;
  showDropdown: boolean;
  newReload: boolean;

  ngOnChanges(changes) {
    if (changes.products.currentValue) {
      this.filteredProducts = changes.products.currentValue;
    }
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  public switchView(): void {
    this.displayList = !this.displayList;
  }

  get isList(): boolean {
    return this.displayList;
  }

  get hasProducts(): boolean {
    if (this.products) {
      return this.products.length !== 0;
    }
    else {
      return false;
    }
  }




  public updateCriteria(filter: Search): void {
    this.filteredProducts = ProductService.filter(this.products, filter);
    this.overlayRef.detach();
  }


  public searchProduct(tpl): void {
    const configs = new OverlayConfig({
      hasBackdrop: true,
    });
    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    configs.scrollStrategy;
    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }

}
