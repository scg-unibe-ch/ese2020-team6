// Packages
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// Services
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
// Classes
import { ProductInformationBase } from '../product-information-base';
// Interfaces
import { AcceptProductRequestBuilder } from '../../../../../models/request/product/accept/accept-product-request-builder.interface';
// Models
import { AcceptProductRequestModel } from '../../../../../models/request/product/accept/accept-product-request.model';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['../product-information.component.scss']
})
export class ReviewProductComponent extends ProductInformationBase implements AcceptProductRequestBuilder {

  public showRejectResponseForm: boolean = false;
  public showAcceptForm: boolean = false;

  constructor(
    route: ActivatedRoute,
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
  }

  public toggleReject(): void {
    this.showRejectResponseForm = !this.showRejectResponseForm;
    this.showAcceptForm = false;
  }

  public reject(form: NgForm): void {
    console.log("reject");
  }

  public buildAcceptProductRequest(): AcceptProductRequestModel {
    return {
      productId: this.product.productId
    };
  };
}
