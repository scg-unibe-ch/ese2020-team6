import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { ProductModel } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss']
})
export class SelectCategoriesComponent {
  @Input()
  name = '';
  @Input()
  cats: Array<SearchModel>;
  @Input()
  filteredProducts: Array<ProductModel>;
  @Input()
  products: Array<ProductModel>;
  @Output() deleteRequest = new EventEmitter<Array<ProductModel>>();


  constructor()
  {
  }

  public removeCategoryByClicking(): void{
    this.deleteRequest.emit(this.filteredProducts);
  }
}
