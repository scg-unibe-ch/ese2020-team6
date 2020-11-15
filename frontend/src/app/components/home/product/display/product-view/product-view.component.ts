import { SearchModel } from 'src/app/models/request/search/search.model';
import { SearchProductComponent } from './../../search-product/search-product.component';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, ViewContainerRef, PipeTransform } from '@angular/core';
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


  public isInTitleOrInDescription(searchTerm: string,title: string,descrip: string): boolean {
    if(searchTerm == null){
      return false;
    }
    if(title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1 || descrip.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1){
      return false;
    }else{
      return true;
    }
  }

  public updateCriteria(event: SearchModel): void {
    this.overlayRef.detach();
    const criteria = event;
    this.filteredProducts = this.products.filter(product => {
      if (
        (criteria.category !== null && criteria.category !== product.category) ||
        (criteria.subcategory !== null && criteria.subcategory !== product.subcategory) ||
        (criteria.priceMax !== null && product.price > criteria.priceMax) ||
        (criteria.priceMin !== null && product.price < criteria.priceMin) ||
        (criteria.location !== null && criteria.location.toString().toLocaleLowerCase() !== product.location.toString().toLocaleLowerCase()) ||
        (criteria.deliverable !== null && criteria.deliverable !== product.isDeliverable) ||
        (this.isInTitleOrInDescription(criteria.titleAndDescription,product.title,product.description))
      ){
        return false;
      }else{
        return true;
      }
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
    configs.scrollStrategy;
    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }

}
