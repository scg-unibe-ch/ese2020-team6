import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input, PipeTransform} from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { CategoryModel } from 'src/app/models/request/product/category-product-request.model';



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
  cat: string;
  color = 'accent';
  categories: Array<CategoryModel>;
  subCategories: Array<CategoryModel>;
  subCat: Array<string>;
  cats: Array<string>;


  constructor(
    private productService: ProductService,
    themeService: ThemeService
  ) {
    super(themeService);
   }

   public ngOnInit(): void {
    this.productService.getCategories().subscribe((values) => {
      this.cats = [];
      this.categories = values;
      for (const cat of this.categories) {
        this.cats.push(cat.category);
      }
    });
    this.productService.getSubCategories().subscribe((values) => {
      this.subCategories = values;
    });
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

  public createSubCat(): any {
    let catId: number;
    this.subCat = [];
    const choosenCat = this.criteria.category;
    for (const cat of this.categories) {
      if (cat.category === choosenCat) {
        catId = cat.id;
      }
    }
    for (const cat of this.subCategories) {
      if (catId === cat.id) {
        this.subCat.push(cat.category);
      }
    }
  }
}
