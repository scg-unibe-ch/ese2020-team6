import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { ProductModel } from '../../../../models/product/product.model';
import { UserModel } from '../../../../models/user/user.model';

@Component({
  selector: 'app-rejected-products',
  templateUrl: './rejected-products.component.html'
})
export class RejectedProductsComponent implements OnInit {

  public products: Array<ProductModel>;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.userService.userObservable.subscribe((user: UserModel) => {
      this.productService.getMyRejectedProducts(user.userId).subscribe((products: Array<ProductModel>) => this.products = products);
    });
  }

}
