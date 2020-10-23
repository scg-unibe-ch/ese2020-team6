// Packages
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
// Classes
import { ProductInformationBase } from '../product-information-base';
// Models
import { RejectProductFormModel, NullRejectProductForm } from '../../../../../models/form/reject-product-form.model';
// Request Builders and Request Models
import {
  AcceptProductRequestBuilder,
  AcceptProductRequestModel,
  RejectProductRequestBuilder,
  RejectProductRequestModel } from '../../../../../models/request/product/product-request-model-builder.module';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['../product-information.component.scss']
})
export class ReviewProductComponent extends ProductInformationBase implements AcceptProductRequestBuilder {

  public showRejectResponseForm: boolean = false;
  public showAcceptForm: boolean = false;

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

  public accept(form: NgForm): void {
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
