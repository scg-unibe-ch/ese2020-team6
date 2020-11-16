import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../../services/product/product.service';
import { UserService } from '../../../../../services/user/user.service';
import { ProductInformationBase } from '../product-information-base';
import { ThemeService } from '../../../../../services/theme/theme.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends ProductInformationBase {

  public showDeleteForm: boolean = false;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    private router: Router,
    themeService: ThemeService
  ) {
    super(route, productService, userService, themeService);
  }

  public toggleDelete(): void {
    this.showDeleteForm = !this.showDeleteForm;
  }

  public delete(): void {
    this.productService.deleteProduct(this.product.productId).subscribe();
    this.router.navigate(['/user/profile/myproducts']);
  }
}
