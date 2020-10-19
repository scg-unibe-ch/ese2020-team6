
import { FormGroup, NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { PostProductRequestBuilder } from '../../../../models/request/product/post/post-product-request-builder.interface';
import { PostProductForm } from '../../../../models/form/post-product-form.model';
import { PostProductRequestModel } from '../../../../models/request/product/post/post-product-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProfileNavigationElementModel } from 'src/app/models/form/profile-navigation-element.model';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductForm> {
  @ViewChild('postProductForm') form: NgForm;
  registerForm: FormGroup;
  requestInformation: PostProductForm;
  productData: any;
  image: any;
  url: any;
  public currentContent: ProfileNavigationElementModel;
  public userId: number;
  formValues: any;
  productId: any;
  product: any;

  constructor(

    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    route.data.subscribe((navigationElement: ProfileNavigationElementModel) => {
      this.currentContent = navigationElement;
    });
    if (userService.isLoggedIn) {
      userService.userObservable.subscribe((user: UserModel) => {
        this.userId = user.userId;
      } );
    }
  }

  ngOnInit(): void {
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
    this.form = form;
    this.productService.post(this).subscribe((values) => {
      console.log(values);
      this.openSnackBar();
    });
    this.router.navigate(['/user/profile/myproducts']);
  }

  public build(): PostProductRequestModel {
    return {
      productId: this.productId,
      title: this.form.value.title,
      description: this.form.value.description,
      price: this.form.value.price,
      category: this.form.value.category,
      offerType: this.form.value.offerType,
      productType: this.form.value.productType,
      picture: this.form.value.picture,
      status: this.form.value.status,
      location: this.form.value.location,
      userId: this.userId
    };
  }
  onFileChanged(event) {
    const file = event.target.files[0];
  }
  public showPreview(form: NgForm, tpl: TemplateRef<any>) {
    this.productData =
    { title: form.value.title,
      description: form.value.description,
      price: form.value.price,
      offerType: form.value.offerType,
      productType: form.value.productType,
      status: form.value.status,
      picture: form.value.picture,
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
      this.formValues = product;
      this.form.form.get('title').setValue(product.title);
      this.form.form.get('description').setValue(product.description);
      this.form.form.get('price').setValue(product.price);
      this.form.form.get('location').setValue(product.location);
      this.form.form.get('offerType').setValue(product.offerType);
      this.form.form.get('productType').setValue(product.productType);
      this.form.form.get('category').setValue(product.category);
      this.form.form.get('status').setValue(product.status);
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
