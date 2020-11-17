import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input} from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { SearchModel, Search } from 'src/app/models/request/search/search.model';
import { CategoryModel, Categories } from 'src/app/models/request/product/category-product-request.model';
import { timeStamp } from 'console';



@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent extends Themable {
  @Output()
  public criteriaChange = new EventEmitter<SearchModel>();
  @Input()
  public products: Array<ProductModel>;

  public criteria: Search = new Search();

  public optionArray: Array<string>;
  private category: string;
  private categories: Categories;
  public categoriesStrings: Array<string> = new Array<string>();
  public subcategoriesStrings: Array<string> = new Array<string>();
  deliverable: string="Select Deliverable";
  toggleChange: boolean=true;


  constructor(
    private productService: ProductService,
    themeService: ThemeService
  ) {
    super(themeService);
  }

  public ngOnInit(): void {
    this.productService.getCategories().subscribe((categories: Array<CategoryModel>) => {
      this.productService.getSubCategories().subscribe((subcategories: Array<CategoryModel>) => {
        this.categories = new Categories(categories, subcategories);
        this.categoriesStrings = this.categories.categoriesStrings;
        this.subcategoriesStrings = new Array<string>();
      });
    });


  }

  changeVisibility(){
    if(this.deliverable=="Select Deliverable"){
      this.deliverable="Undo Deliverable"
      this.criteria.deliverable=false;
      this.toggleChange=false;
    }else{
      this.deliverable="Select Deliverable"
      this.toggleChange=true;
      this.criteria.deliverable=null;
    }
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

  public updateSubCategoryStrings(): void {
    this.subcategoriesStrings = this.categories.getSomeSubcategoriesByName(this.criteria.categories);
  }

  get showSubcategoriesSelect(): boolean {
    return this.subcategoriesStrings.length > 0;
  }
}
