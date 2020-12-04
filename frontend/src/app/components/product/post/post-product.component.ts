import { NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product/product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  PostProductRequestBuilder,
  PostProductRequestModel,
  PostProductRequest,
  UpdateProductRequestBuilder,
  UpdateProductRequestModel,
  UpdateProductRequest } from 'src/app/models/request/product/product-request-model-builder.module';
import { ProductModel, NullProduct } from 'src/app/models/product/product.model';
import { PostProductForm } from 'src/app/models/form/post-product-form.model';
import { Categories, Category, Subcategory } from 'src/app/models/category/category.model';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder, UpdateProductRequestBuilder {
  private productId: number;
  public isUpdate = false;
  public previewData: ProductModel;
  public picture: any;
  private categories: Categories = Categories.NullCategories;
  public categoryStrings: Array<string> = new Array<string>();
  public subcategoryStrings: Array<string> = new Array<string>();
  public originalProductTypeStrings: Array<string> = ['Item', 'Service'];
  public originalOfferTypeStrings: Array<string> = ['Sell', 'Rent'];
  public offerTypeStrings: Array<string> = new Array<string>();
  public isDeliverableStrings: Array<string> = ['Yes', 'No'];
  public product: ProductModel = new NullProduct();

  @ViewChild('postProductForm', { read: NgForm })
  public form: NgForm;
  previewPicture: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe(parameters => {
      this.productId = parseInt(parameters.productId, 10);
      if (!isNaN(this.productId)) {
        this.isUpdate = true;
        this.getProduct();
      } else {
        this.getCategories();
      }
    });
  }

  private getCategories(product?: ProductModel): void {
    this.productService.getCategories().subscribe((categories: Categories) => {
      this.categories = categories;
      this.categoryStrings = categories.allCategories.map((category: Category) => category.toString());
      this.subcategoryStrings = new Array<string>();
      if (product) {
        this.updateSubCategoryStrings(product.category);
        this.form.setValue(PostProductForm.buildFromProductModel(product));
      }
    });
  }

  private getProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product: ProductModel) => {
      this.picture = product.picture;
      this.getCategories(product);
    });
  }


  public selectFile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.picture = file;
    }
    // for preview picture
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const result: string = event.target.result;
      this.previewPicture = result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isUpdate) {
        const formData = new FormData();
        formData.append('picture', this.picture);
        formData.append('category', form.value.category);
        formData.append('description', form.value.description);
        formData.append('expirationDate', form.value.expirationDate);
        formData.append('isDeliverable', form.value.isDeliverableString);
        formData.append('offerType', form.value.offerType);
        formData.append('price', form.value.price);
        formData.append('productType', form.value.productType);
        formData.append('subcategory', form.value.subcategory);
        formData.append('title', form.value.title);
        const addressString = JSON.stringify(form.value.address);
        formData.append('address', addressString);
        this.httpClient.put<any>(environment.endpointURL + 'product/update/' + this.productId, formData).subscribe(
          (values) => this.success(),
          (err) => {console.log(err)}
        );
      } else {
        const formData = new FormData();
        formData.append('picture', this.picture);
        formData.append('category', form.value.category);
        formData.append('description', form.value.description);
        formData.append('expirationDate', form.value.expirationDate);
        formData.append('isDeliverable', form.value.isDeliverableString);
        formData.append('offerType', form.value.offerType);
        formData.append('price', form.value.price);
        formData.append('productType', form.value.productType);
        formData.append('subcategory', form.value.subcategory);
        formData.append('title', form.value.title);
        const addressString = JSON.stringify(form.value.address);
        formData.append('address', addressString);

        this.httpClient.post<any>(environment.endpointURL + 'product/post', formData).subscribe(
          (res) => this.success(),
          (err) => {console.log(err)}
        );
        // this.productService.postProduct(this).subscribe((values) => this.success());
      }
    }
  }

  private success(): void {
    this.openSnackBar();
    this.router.navigate(['/user/profile/myproducts']);
  }



  public buildUpdateProductRequest(): UpdateProductRequestModel {
    return UpdateProductRequest.buildFromPostProductFormModel(this.form.value, this.picture);
  }

  public buildPostProductRequest(): PostProductRequestModel {
    return PostProductRequest.buildFromPostProductFormModel(this.form.value, this.picture);
  }

  public openSnackBar(): void {
    this.snackBar.open('Your product is created', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  public showPreview(tpl: TemplateRef<any>): void {
    this.setUpPreviewData();
    const configs = new OverlayConfig({
      hasBackdrop: true,
     });
    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayRef = this.overlay.create(configs);
    overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

  private setUpPreviewData(): void {
    this.previewData = Object.assign({
      isDeliverable: this.form.value.isDeliverableString === 'Yes' ? true : false,
      status: 'Available',
      sellerId: ''
    }, this.form.value);
  }

  public updateSubCategoryStrings(category: string): void {
    this.subcategoryStrings = this.categories.getSubcategoriesByCategoryName(category)
    .map((subcategory: Subcategory) => subcategory.toString());
  }

  public udateOfferTypeStrings(productType: string): void {
    const productTypeIndex: number = this.originalProductTypeStrings.indexOf(productType);
    if (productTypeIndex >= 0) {
      if (productTypeIndex === 0) {
        this.offerTypeStrings = this.originalOfferTypeStrings;
      } else if (productTypeIndex === 1) {
        this.offerTypeStrings = [this.originalOfferTypeStrings[1]];
      }
    }
  }
}
