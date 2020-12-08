import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductInformationBase } from '../product-information-base';
import { RejectProductFormModel, NullRejectProductForm } from 'src/app/models/form/reject-product-form.model';
import {
  AcceptProductRequestBuilder,
  RejectProductRequestBuilder,
  AcceptProductRequestModel,
  RejectProductRequestModel } from 'src/app/models/request/request.module';
import { PopupService } from 'src/app/services/popup/popup.service';

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
    private popupService: PopupService
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
    } else {
      this.popupService.openPopup('root', 'The input is not valid!', 'warn');
    }
  }

  public buildRejectProductRequest(): RejectProductRequestModel {
    return {
      productId: this.product.productId,
      rejectionMessage: this.values.reason
    }
  }
}
