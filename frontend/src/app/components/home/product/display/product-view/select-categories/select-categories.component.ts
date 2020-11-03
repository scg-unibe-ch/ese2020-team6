import { Products } from './../../../../../../../../../backend/src/models/products.model';
import { ThemeService } from '../../../../../../services/theme/theme.service';
import { Themable } from '../../../../../../models/theme/themable';
import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { ProductModel } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss']
})
export class SelectCategoriesComponent extends Themable {
  @Input()
  name: string = '';
  @Input()
  cats: Array<SearchModel>;
  @Input()
  filteredProducts: Array<ProductModel>;
  @Input()
  products: Array<ProductModel>;
  @Output() deleteRequest = new EventEmitter<Array<ProductModel>>();


  constructor(themeService: ThemeService) {
    super(themeService);
  }

  public removeCategoryByClicking(index : number,){
    this.cats.splice(index,1);
    this.updateFilterProduct();
    console.log("Nachher:  "+this.filteredProducts);
    this.deleteRequest.emit(this.filteredProducts);

  }
  public updateFilterProduct(){
    console.log("Vorher:  "+this.filteredProducts);
    this.filteredProducts=this.products.filter(product => {
      for (let entry of this.cats) {
        console.log("Inder Liste ist:  "+ entry.category);
        console.log("Product Category:  "+ product.category);
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
}
