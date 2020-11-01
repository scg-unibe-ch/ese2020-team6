import { SearchService } from './../../../../services/product/search/search.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Themable } from 'src/app/models/theme/themable';
import { ProductService } from 'src/app/services/product/product.service';
import { SearchModel } from 'src/app/models/request/search/search.model';
import { ProductModel } from 'src/app/models/product/product.model';
import { Router } from '@angular/router';
import { NullPostProductForm, PostProductFormModel } from 'src/app/models/form/post-product-form.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent extends Themable implements OnInit  {
  criterias: SearchModel;
  products: any;
  public values = new SearchModel();

  constructor(
    themeService: ThemeService,
    private productService: ProductService,
  ) {
    super(themeService);
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.criterias = this.values;
    console.log(this.criterias, 'Halloooooooo criterias');
    console.log(this.values, 'Halloooooooo form');
    this.productService.getSearchedProducts(this.criterias).subscribe(
      (values: Array<ProductModel>) => this.products = values);
  }
}
