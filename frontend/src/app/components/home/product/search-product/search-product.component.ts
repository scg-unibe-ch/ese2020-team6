import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input, PipeTransform } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { SearchModel } from 'src/app/models/request/search/search.model';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent extends Themable implements PipeTransform {
  @Output() criteriaChange = new EventEmitter<SearchModel>();
  @Input()
  productArray: Array<ProductModel>
  products: any;
  search = false;
  public criteria = new SearchModel();


  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
   }
  transform(productArray, searchTerm: string) {
    for (let entry of productArray) {
      console.log(entry); // 1, "string", false
    }
  }

  onSubmit(): void {
    this.criteriaChange.emit(this.criteria);
  }
}
