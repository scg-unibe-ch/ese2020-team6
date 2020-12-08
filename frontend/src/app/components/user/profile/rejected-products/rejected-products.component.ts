import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { UserModel } from '../../../../models/user/user.model';
import { SuccessLoader } from 'src/app/services/service.module';
import { Products, NullProducts } from 'src/app/models/product/products.model';

@Component({
  selector: 'app-rejected-products',
  templateUrl: './rejected-products.component.html'
})
export class RejectedProductsComponent implements OnInit {

  public products: Products = NullProducts.instance();

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.subscribe(new SuccessLoader((user: UserModel) => {
      this.productService.getMyRejectedProducts(user.userId).subscribe((products: Products) => this.products = products);
    }));
  }

}
