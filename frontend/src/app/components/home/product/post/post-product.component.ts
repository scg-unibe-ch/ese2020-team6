
import { FormGroup, NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { PostProductRequestBuilder } from '../../../../models/request/product/post/post-product-request-builder.interface';
import { PostProductFormModel, NullPostProductForm } from '../../../../models/form/post-product-form.model';
import { PostProductRequestModel } from '../../../../models/request/product/post/post-product-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductFormModel> {
  @ViewChild('postProductForm') form: NgForm;
  requestInformation: PostProductFormModel; // remove this later when cleaning up post product request
  productData: any;
  image: any;
  url: any;
  private userId: number;
  private productId: any;
  product: any;
  public values: PostProductFormModel = new NullPostProductForm();

  constructor(

    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn) {
      this.userService.userObservable.subscribe((user: UserModel) => {
        this.userId = user.userId;
      });
    }
    this.productId = this.route.snapshot.paramMap.get('productId');
    if (this.productId !== null) {
      this.updateProduct();
    }
  }

  openSnackBar() {
    this.snackBar.open('Your product is crated', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.form = form;
      this.values = form.value;
      this.productService.post(this).subscribe((values) => {
        this.openSnackBar();
        this.router.navigate(['/user/profile/myproducts']);
      });
    }
  }

  public build(): PostProductRequestModel {
    const request: PostProductRequestModel = Object.assign(
      this.values,
      {
        userId: this.userId,
        productId: this.productId
      }
    );
    return request;
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
  public showPreview(form: NgForm, tpl: TemplateRef<any>) {
    let values = form.value;
    this.productData = {
      title: values.title,
      description: values.description,
      price: values.price,
      offerType: values.offerType,
      productType: values.productType,
      status: values.status,
      picture: values.picture,
    };
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

  updateProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product: any) => {
      this.product = product;
      this.values = product;
    });
  }

  setType(): string {
    if (this.productId !== null) {
      return this.product.productType;
    } else {
      return 'Product Type';
    }
  }
  setOffer(): string {
    if (this.productId !== null) {
      return this.product.offerType;
    } else {
      return 'Offer Type';
    }
  }
  setStatus(): string {
    if (this.productId !== null) {
      return this.product.status;
    } else {
      return 'Status';
    }
  }
  setCategory(): string {
    if (this.productId !== null) {
      return this.product.category;
    } else {
      return 'Category';
    }
  }
}
