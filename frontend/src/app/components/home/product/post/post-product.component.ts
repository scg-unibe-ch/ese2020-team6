import { NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { PostProductRequestBuilder } from '../../../../models/request/product/post/post-product-request-builder.interface';
import { PostProductForm } from '../../../../models/form/post-product-form.model';
import { PostProductRequestModel } from '../../../../models/request/product/post/post-product-request.model';
import { Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductForm> {
  form: NgForm;
  requestInformation: PostProductForm;
  productData: any;
  image: any;
  url: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private snackBar: MatSnackBar
  ) { }

  openSnackBar() {
    this.snackBar.open('Your product is crated', '', {
      duration: 2000,
      panelClass: ['snackbar']
    });
  }

  onSubmit(form: NgForm) {
    this.productService.post(this).subscribe((values) => {console.log(values); });
    this.openSnackBar();
    this.router.navigate(['/product/buy-product']);
  }

  public build(): PostProductRequestModel {
    return {
      title: '',
      description: '',
      price: 0,
      category: '',
      offerType: '',
      productType: '',
      picture: '',
      status: '',
      location: ''
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
}
