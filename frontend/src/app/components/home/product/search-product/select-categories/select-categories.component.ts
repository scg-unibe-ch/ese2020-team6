import { ThemeService } from './../../../../../services/theme/theme.service';
import { Themable } from './../../../../../models/theme/themable';
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
    this.deleteRequest.emit(this.filteredProducts);
  }
}
