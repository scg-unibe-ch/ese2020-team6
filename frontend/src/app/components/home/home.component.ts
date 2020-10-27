import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { ProductModel } from '../../models/product/product.model';
import { Themable } from '../../models/theme/themable';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Themable {

  public products: Array<ProductModel> = new Array();
  public isLoggedIn = false;

  constructor(
    productService: ProductService,
    userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);

    productService.getAllAcceptedProducts().subscribe((products: Array<ProductModel>) => this.products = products);
    this.isLoggedIn = userService.isLoggedIn;
  }
}
