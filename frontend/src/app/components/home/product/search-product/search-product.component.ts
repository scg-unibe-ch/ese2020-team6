import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input} from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { SearchModel, Search } from 'src/app/models/request/search/search.model';
import { CategoryModel } from 'src/app/models/request/product/category-product-request.model';
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
  subCat: Array<string>;
  private categories: Array<CategoryModel>;
  private subCategories: Record<any, Array<CategoryModel>> = {};
  public categoriesStrings: Array<string> = new Array<string>();
  public subCategoriesStrings: Array<string> = new Array<string>();
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
      this.categories = categories;
      this.categoriesStrings = Object.assign([], categories).map((category: CategoryModel) => category.category);
    });

    this.productService.getSubCategories().subscribe((subCategories: Array<CategoryModel>) => {
      subCategories.forEach((subCategory: CategoryModel) => {
        if (!this.subCategories[subCategory.id]) {
          this.subCategories[subCategory.id] = new Array<CategoryModel>();
        }
        this.subCategories[subCategory.id].push(subCategory);
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
    let arrayOfSubcategoryArrays: Array<Array<string>> = this.criteria.categories.map((category: string) => {
      let categoryIndex: number = this.categoriesStrings.indexOf(category);
      let categoryId: number = this.categories[categoryIndex].id;
      let subCategories: Array<CategoryModel> = this.subCategories[categoryId];
      return this.getAllCategoryStrings(subCategories);
    });

    this.subCategoriesStrings = this.reduceToOneArray(arrayOfSubcategoryArrays);

  }

  private getAllCategoryStrings(categories: Array<CategoryModel>): Array<string> {
    return categories.map((category: CategoryModel) => {
      return category.category
    });
  }

  private reduceToOneArray(arrayOfSubcategoryArrays: Array<Array<string>>): Array<string> {
    return arrayOfSubcategoryArrays.reduce((result: Array<string>, subCategoriesOfCategory: Array<string>) => {
      return result.concat(subCategoriesOfCategory);
    }, []);
  }

  get showSubcategoriesSelect(): boolean {
    return this.subCategoriesStrings.length > 0;
  }
}
