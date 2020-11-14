import { ProductService } from 'src/app/services/product/product.service';
import { ProductModel } from 'src/app/models/product/product.model';
import { Component, EventEmitter, Output, Input, PipeTransform} from '@angular/core';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { CategoryModel } from 'src/app/models/request/product/category-product-request.model';
import { timeStamp } from 'console';



@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements PipeTransform {
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
  deliv = 'Select Deliverable';
  toggleChange = true;
  show = false;
  isShown = false ;


  constructor(
    private productService: ProductService,
  ) {}

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

  SubCategoryShow(entry: any): void {
    console.log(entry);
    this.cat = entry;
    this.show = true;
  }

  changeVisibility(): void {
    if (this.deliv === 'Select Deliverable'){
      this.deliv = 'Undo Deliverable';
      this.criteria.deliverable = false;
      this.toggleChange = false;
    }else{
      this.deliv ='Select Deliverable';
      this.toggleChange = true;
      this.criteria.deliverable = null;
    }
  }

  OfferTypeShow(entry: any): void {
    if (entry === 'Service'){
      this.optionArray = ['Rent'];
    }else{
      this.optionArray = ['Sell', 'Rent'];
    }
    this.isShown = true;
  }

  onSubmit(): void {
    this.criteriaChange.emit(this.criteria);
  }
  transform(productArray, searchTerm: string): void {
    for (const entry of productArray) {
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
