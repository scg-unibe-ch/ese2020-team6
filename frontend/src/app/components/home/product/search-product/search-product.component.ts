import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SelectCategoriesComponent } from './../search-product/select-categories/select-categories.component';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input, PipeTransform} from '@angular/core';
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
  productArray: Array<ProductModel>;
  public criteria = new SearchModel();
  optionArray: Array<string>;
  catArray: Array<string> = ['Houses', 'Pets', 'Nice Stuff'];
  cat: string;
  color = 'accent';


  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
   }


  show: boolean = false ;
  SubCategoryShow(entry: any) {
    console.log(entry);
    this.cat=entry;
    this.show = true;
  }

  isShown: boolean = false ;
  OfferTypeShow(entry: any) {
    if(entry=="Service"){
      this.optionArray=['Rent'];
    }else{
      this.optionArray=['Sell', 'Rent'];
    }
    this.isShown = true;
  }

  onSubmit(): void {
    this.criteriaChange.emit(this.criteria);
  }
  transform(productArray, searchTerm: string) {
    for (let entry of productArray) {
      console.log(entry);
    }
  }
}
