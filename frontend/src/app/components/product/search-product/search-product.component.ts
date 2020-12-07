import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input} from '@angular/core';
import { SearchModel, Search } from 'src/app/models/request/search/search.model';
import { Categories, Category, Subcategory } from 'src/app/models/category/category.model';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent {
  @Output()
  public criteriaChange = new EventEmitter<SearchModel>();
  @Input()
  public productArray: Array<ProductModel>;

  public criteria: Search = new Search();

  public optionArray: Array<string>;
  private categories: Categories;
  public categoryStrings: Array<string> = new Array<string>();
  public subcategoryStrings: Array<string> = new Array<string>();
  public deliverable = 'Select Deliverable';
  public toggleChange = true;
  public isShown = false;


  constructor(
    private productService: ProductService,
  ) {}

  public ngOnInit(): void {
    this.productService.getCategories().subscribe((categories: Categories) => {
      this.categories = categories;
      this.categoryStrings = categories.allCategories.map((category: Category) => category.toString());
      this.subcategoryStrings = new Array<string>();
    });


  }

  public changeVisibility(): void {
    if (this.deliverable === 'Select Deliverable'){
      this.deliverable = 'Undo Deliverable';
      this.criteria.deliverable = false;
      this.toggleChange = false;
    }else{
      this.deliverable = 'Select Deliverable';
      this.toggleChange = true;
      this.criteria.deliverable = null;
    }
  }

  public OfferTypeShow(entry: any): void {
    if (entry === 'Service'){
      this.optionArray = ['Rent'];
    }else{
      this.optionArray = ['Sell', 'Rent'];
    }
    this.isShown = true;
  }

  public onSubmit(): void {
    this.criteriaChange.emit(this.criteria);
  }

  public updateSubCategoryStrings(): void {
    this.subcategoryStrings = this.categories.getSomeSubcategoriesByCategoryName(this.criteria.categories)
    .map((subcategory: Subcategory) => subcategory.toString());
  }

  get showSubcategoriesSelect(): boolean {
    return this.subcategoryStrings.length > 0;
  }
}
