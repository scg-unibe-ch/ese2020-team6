import { Search } from 'src/app/models/search/search.model';
import { SearchProductComponent } from 'src/app/components/product/search-product/search-product.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, ViewContainerRef, PipeTransform, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Products, NullProducts } from 'src/app/models/product/products.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  overlayRef: any;
  @Input() path = '';
  @Input() products: Products = NullProducts.instance();
  filteredProducts: Products = NullProducts.instance();
  @ViewChild(SearchProductComponent)
  child: SearchProductComponent;
  public CategoryName: string;
  private displayList = true;
  showDropdown: boolean;
  newReload: boolean;

  public ngOnChanges(changes: SimpleChanges) {
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
