import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductInformationBase } from '../product-information-base';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends ProductInformationBase {
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
  }
}
