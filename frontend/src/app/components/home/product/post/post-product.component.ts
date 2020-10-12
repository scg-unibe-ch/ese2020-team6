import { NgForm } from '@angular/forms';
import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { PostProductRequestBuilder } from '../../../../models/request/product/post/post-product-request-builder.interface';
import { PostProductForm } from '../../../../models/form/post-product-form.model';
import { PostProductRequest } from '../../../../models/request/product/post/post-product-request.model';
import { Router } from '@angular/router';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements PostProductRequestBuilder<PostProductForm> {
  form: NgForm;
  requestInformation: PostProductForm;
  productData: any;
  isOpen = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  onSubmit(form: NgForm) {
    this.productService.post(this).subscribe((values) => {console.log(values); });
    this.router.navigate(['/product/buy-product']);
  }

  public build(): PostProductRequest {
    return {
      title: '',
      description: '',
      price: 0,
      offerType: '',
      productType: '',
      picture: '',
      status: ''
    };
  }

  public showPreview(form: NgForm, tpl: TemplateRef<any>) {
    this.productData =
    { title: form.value.title,
      description: form.value.description,
      price: form.value.price,
      offerType: form.value.offerType,
      productType: form.value.productType,
      status: form.value.status,
      picture: form.value.picture
    };

    const configs = new OverlayConfig({
      hasBackdrop: true,
     });
    configs.positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()
    const overlayRef = this.overlay.create(configs);
    overlayRef.attach(new TemplatePortal(tpl, this.viewContainerRef));
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }
}
