
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
import { SelectComponent } from 'src/app/components/custom-form/select/select.component';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductForm> {
  @ViewChild('postProductForm') form: NgForm;
  @ViewChild('productTypeChild') productType: SelectComponent;
  @ViewChild('offerTypeChild') offerType: SelectComponent;
  @ViewChild('titleChild') title: SelectComponent;
  @ViewChild('descriptionChild') description: SelectComponent;
  @ViewChild('priceChild') price: SelectComponent;
  @ViewChild('locationChild') location: SelectComponent;
  @ViewChild('statusChild') status: SelectComponent;
  @ViewChild('categoryChild') category: SelectComponent;
  @ViewChild('pictureChild') picture: SelectComponent;
  requestInformation: PostProductForm;
  productData: any;
  public currentContent: ProfileNavigationElementModel;
  public userId: number;
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
    this.snackBar.open('Your product is created', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  onSubmit(form: NgForm) {
    //this.form = form;
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
    this.productService.get(this.productId).subscribe((product: any) => {
      this.product = product;
      this.form.form.get('title').setValue(product.title);
      this.form.form.get('description').setValue(product.description);
      this.form.form.get('price').setValue(product.price);
      this.form.form.get('location').setValue(product.location);
      this.form.form.get('offerType').setValue(product.offerType);
      this.offerType.current = product.offerType;
      this.form.form.get('productType').setValue(product.productType);
      this.productType.current = product.productType;
      this.form.form.get('category').setValue(product.category);
      this.category.current = product.category;
      this.form.form.get('status').setValue(product.status);
      this.status.current = product.status;
    });
  }
}
