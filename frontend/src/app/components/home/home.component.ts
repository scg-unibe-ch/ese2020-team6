import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { UserService } from '../../services/user/user.service';
import { ProductModel } from '../../models/product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public products: Array<ProductModel> = new Array();
  public isLoggedIn: boolean = false;

  constructor(
    productService: ProductService,
    userService: UserService
  ) {
    productService.getAllAcceptedProducts().subscribe((products: Array<ProductModel>) => this.products = products);
    this.isLoggedIn = userService.isLoggedIn;
  }
}
