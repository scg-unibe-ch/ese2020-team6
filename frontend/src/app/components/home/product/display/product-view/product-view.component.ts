import { SelectCategoriesComponent } from './select-categories/select-categories.component';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { SearchProductComponent } from './../../search-product/search-product.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ProductModel } from '../../../../../models/product/product.model';
import { Themable } from '../../../../../models/theme/themable';
import { ThemeService } from '../../../../../services/theme/theme.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent extends Themable {
  overlayRef: any;
  @Input() path = '';
  @Input() products: Array<ProductModel>;
  filteredProducts: Array<ProductModel>;
  @ViewChild(SearchProductComponent)
  child: SearchProductComponent;
  select: SelectCategoriesComponent;
  public catslist: Array<String>=[];
  public name;
  private displayList = true;
  showDropdown: boolean;
  newReload: boolean;

  ngOnChanges(changes) {
    if (changes.products.currentValue) {
      this.filteredProducts = changes.products.currentValue;
    }
  }

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
    if (this.products) {
      return this.products.length !== 0;
    }
    else {
      return false;
    }
  }

  public updateCriteria(event: SearchModel): void {
    console.log("Wenn Search angewendet wird");
    this.selectCategories(event);
    this.overlayRef.detach();
    const criteria = event;
    this.filteredProducts = this.products.filter(product => {
      console.log(criteria.price+"     "+product.price);
      if (
        (criteria.category !== null && product.category !== criteria.category) ||
        (criteria.subcategory !== null && product.subcategory !== criteria.subcategory) ||
        (criteria.price !== null && product.price > criteria.price) ||
        (criteria.status !== null && product.status !== criteria.status) ||
        (criteria.location !== null && product.location !== criteria.location) ||
        (criteria.deliverable !== null && product.isDeliverable !== criteria.deliverable)
      ) {
        return false;
      }
      return true;
    });
  }

  public selectCategories(criteria: SearchModel): boolean {
    console.log(criteria.category+"     "+criteria.subcategory);
    if (criteria.category !== null){
      this.name=criteria.category;
      console.log(this.catslist);
      this.catslist=[...this.catslist, this.name]
      return true;
    }
    return false;
  }

  public searchProduct(tpl): void {
    const configs = new OverlayConfig({
      hasBackdrop: true,
    });
    console.log("Wenn Search Product gedrückt wird");
    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }

}
