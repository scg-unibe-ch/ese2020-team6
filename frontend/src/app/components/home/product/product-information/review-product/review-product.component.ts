import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html'
})
export class ReviewProductComponent extends ProductInformationBase {

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
    console.log("accept");
  }

  public toggleReject(): void {
    this.showRejectResponseForm = !this.showRejectResponseForm;
    this.showAcceptForm = false;
  }

  public reject(form: NgForm): void {
    console.log("reject");    
  }
}
