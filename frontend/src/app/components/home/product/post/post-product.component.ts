// Packages
import { FormGroup, NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';
// Services
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
// Request Builders and Request Models
import {
  PostProductRequestBuilder,
  PostProductRequestModel,
  UpdateProductRequestBuilder,
  UpdateProductRequestModel } from '../../../../models/request/product/product-request-model-builder.module';
// Models
import { UserModel, NullUser } from '../../../../models/user/user.model';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { PostProductFormModel, NullPostProductForm } from '../../../../models/form/post-product-form.model';
import { ProfileNavigationElementModel } from '../../../../models/form/profile-navigation-element.model';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder, UpdateProductRequestBuilder {
  @ViewChild('postProductForm') form: NgForm;
  image: any;
  url: any;
  public values: PostProductFormModel = new NullPostProductForm();
  public product: ProductModel = new NullProduct();
  private userId: number;
  private productId: number;
  private isUpdate: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    if (this.userService.isLoggedIn) {
      this.userService.userObservable.subscribe((user: UserModel) => {
        this.userId = user.userId;
      });
    }

    this.route.params.subscribe(parameters => {
      this.productId = parseInt(parameters.productId,10);
      if (!isNaN(this.productId)) {
        this.isUpdate = true;
        this.updateForm();
      }
    });
  }

  private updateForm(): void {
    this.productService.getProductById(this.productId).subscribe((product: ProductModel) => {
      this.product = product;
      let values: any = Object.assign({}, product);
      values.isDeliverable = product.isDeliverable ? 'Yes' : 'No';
      this.values = Object.assign({}, values);
    });
  }



  onSubmit(form: NgForm) {
    if (form.valid) {
      this.values = form.value;
      if (this.isUpdate) {
        this.productService.updateProduct(this).subscribe((values) => {
          console.log(values);

        })
      } else {
        this.productService.postProduct(this).subscribe((values) => {
          this.openSnackBar();
        });
      }
      this.router.navigate(['/user/profile/myproducts']);
    }
  }

  private setupProduct(): void {
    let product: any = this.values;
    product.isDeliverable = this.values.isDeliverable === 'Yes' ? true : false;
    this.product = Object.assign({}, product);
  }

  public buildUpdateProductRequest(): UpdateProductRequestModel {
    this.setupProduct();
    const request: UpdateProductRequestModel = Object.assign(this.product, {
        userId: this.userId,
        productId: this.productId
      }
    );
    return request;
  }

  public buildPostProductRequest(): PostProductRequestModel {
    this.setupProduct();
    const request: PostProductRequestModel = Object.assign(this.product, {
        userId: this.userId
      }
    );
    return request;
  }

  public getProductFromFrom(): ProductModel {
    this.setupProduct();
    const product: ProductModel = Object.assign(this.product, {
        userId: this.userId
      }
    );
    return product;
  }

  public openSnackBar() {
    this.snackBar.open('Your product is created', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  public onFileChanged(event) {
    const file = event.target.files[0];
  }

  public showPreview(form: NgForm, tpl: TemplateRef<any>) {
    let values = form.value;
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
}
