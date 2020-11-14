import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';
import { RejectProductFormModel, NullRejectProductForm } from '../../../../../models/form/reject-product-form.model';
import {
  AcceptProductRequestBuilder,
  RejectProductRequestBuilder,
  AcceptProductRequestModel,
  RejectProductRequestModel } from '../../../../../models/request/product/product-request-model-builder.module';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['../product-information.component.scss']
})
export class ReviewProductComponent extends ProductInformationBase implements AcceptProductRequestBuilder, RejectProductRequestBuilder {

  public showRejectResponseForm = false;
  public showAcceptForm = false;

  private values: RejectProductFormModel = new NullRejectProductForm();

  constructor(
    route: ActivatedRoute,
    private router: Router,
    productService: ProductService,
    userService: UserService,
  ) {
    super(route, productService, userService);
  }

  public toggleAccept(): void {
    this.showAcceptForm = !this.showAcceptForm;
    this.showRejectResponseForm = false;
  }

  public accept(): void {
    this.productService.acceptProduct(this).subscribe();
    this.router.navigate(['/user/profile/reviewproducts']);
  }

  public buildAcceptProductRequest(): AcceptProductRequestModel {
    return {
      productId: this.product.productId
    }
  }

  public toggleReject(): void {
    this.showRejectResponseForm = !this.showRejectResponseForm;
    this.showAcceptForm = false;
  }

  public reject(form: NgForm): void {
    if (form.valid) {
      this.values = form.value;
      this.productService.rejectProduct(this).subscribe();
      this.router.navigate(['/user/profile/reviewproducts']);
    }
  }

  public buildRejectProductRequest(): RejectProductRequestModel {
    return {
      productId: this.product.productId,
      rejectionMessage: this.values.reason
    }
  }
}
