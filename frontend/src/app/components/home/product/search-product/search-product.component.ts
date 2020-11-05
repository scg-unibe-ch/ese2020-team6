import { Component, EventEmitter, Output} from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { SearchModel } from 'src/app/models/request/search/search.model';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent extends Themable  {
  @Output() criteriaChange = new EventEmitter<SearchModel>();
  products: any;
  search = false;
  public criteria = new SearchModel();

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
   }

  onSubmit(): void {
    this.criteriaChange.emit(this.criteria);
  }
}
