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
  public catslist: Array<SearchModel>=[];
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
  public crossOffItem(cats: Array<ProductModel>){

    this.filteredProducts=cats;
  }

  public updateCriteria(event: SearchModel): void {
    this.overlayRef.detach();
    const criteria = event;
    this.catslist=[...this.catslist, criteria];
    this.filteredProducts = this.products.filter(product => {
      for (let entry of this.catslist) {
        if(entry.category==product.category){
          if (
            (entry.subcategory !== null && entry.subcategory !== product.subcategory) ||
            (entry.price !== null && product.price > entry.price) ||
            (entry.status !== null && entry.status !== product.status) ||
            (entry.location !== null && entry.location !== product.location) ||
            (entry.deliverable !== null && entry.deliverable !== product.isDeliverable)
          ) {
          }else{
            return true;
          }
        }
      }
      return false;
    });
  }


  public searchProduct(tpl): void {
    const configs = new OverlayConfig({
      hasBackdrop: true,
    });
    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }

}
