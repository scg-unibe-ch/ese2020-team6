import { NgForm, AbstractControl } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../services/product/product.service';
import {
  PostProductRequestBuilder,
  PostProductRequestModel,
  PostProductRequest,
  UpdateProductRequestBuilder,
  UpdateProductRequestModel,
  UpdateProductRequest } from '../../../../models/request/product/product-request-model-builder.module';
import { UserModel } from '../../../../models/user/user.model';
import { ProductModel, NullProduct, Product } from '../../../../models/product/product.model';
import { PostProductFormModel, NullPostProductForm, PostProductForm } from '../../../../models/form/post-product-form.model';
import { Themable } from '../../../../models/theme/themable';
import { ThemeService } from '../../../../services/theme/theme.service';
import { CategoryModel, Categories } from '../../../../models/request/product/category-product-request.model';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent extends Themable implements PostProductRequestBuilder, UpdateProductRequestBuilder {
  private productId: number;
  public isUpdate: boolean = false;
  public previewData: ProductModel;
  public picture: string;
  private categories: Categories = Categories.NullCategories;
  public categoriesStrings: Array<string> = new Array<string>();
  public subcategoriesStrings: Array<string> = new Array<string>();
  public originalProductTypeStrings: Array<string> = ['Item', 'Service'];
  public originalOfferTypeStrings: Array<string> = ['Sell', 'Rent'];
  public offerTypeStrings: Array<string> = new Array<string>();
  public isDeliverableStrings: Array<string> = ['Yes', 'No'];
  public product: ProductModel = new NullProduct();

  @ViewChild('postProductForm', { read: NgForm })
  public form: NgForm;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    themeService: ThemeService
  ) {
    super(themeService);
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
    this.productService.getCategories().subscribe((categories: Array<CategoryModel>) => {
      this.productService.getSubCategories().subscribe((subcategories: Array<CategoryModel>) => {
        this.categories = new Categories(categories, subcategories);
        this.categoriesStrings = this.categories.categoriesStrings;
        this.subcategoriesStrings = new Array<string>();
        if (product) {
          this.updateSubCategoryStrings(product.category);
          this.form.setValue(PostProductForm.buildFromProductModel(product));
        }
      });
    });
  }

  private getProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product: ProductModel) => {
      this.picture = product.picture;
      this.getCategories(product);
    });
  }


  public selectFile(event): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const result: string = event.target.result;
      this.product.picture = result;
      this.picture = result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }


  public onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isUpdate) {
        this.productService.updateProduct(this, this.productId).subscribe((values) => this.success());
      } else {
        this.productService.postProduct(this).subscribe((values) => this.success());
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
      userId: ''
    }, this.form.value);
  }

  public updateSubCategoryStrings(category: string): void {
    this.subcategoriesStrings = this.categories.getSubcategoriesByName(category);
  }

  public udateOfferTypeStrings(productType: string): void {
    let productTypeIndex: number = this.originalProductTypeStrings.indexOf(productType);
    if (productTypeIndex >= 0) {
      if (productTypeIndex == 0) {
        this.offerTypeStrings = this.originalOfferTypeStrings;
      } else if (productTypeIndex == 1) {
        this.offerTypeStrings = [this.originalOfferTypeStrings[1]];
      }
    }
  }
}
