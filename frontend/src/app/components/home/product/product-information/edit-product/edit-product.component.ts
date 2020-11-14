import {Overlay} from '@angular/cdk/overlay';
import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends ProductInformationBase {

  private overlayRef: any;

  public showDeleteForm = false;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    private router: Router,
  ) {
    super(route, productService, userService);
  }

  public toggleDelete(): void {
    this.showDeleteForm = !this.showDeleteForm;
  }

  public delete(): void {
    this.productService.deleteProduct(this.product.productId).subscribe();
    this.router.navigate(['/user/profile/myproducts']);
    this.overlayRef.dispose();
  }
}
