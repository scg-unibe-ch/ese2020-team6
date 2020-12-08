import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { User } from 'src/app/models/user/user.model';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';
import { NullProducts, Products } from 'src/app/models/product/products.model';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html'
})
export class MyProductsComponent implements OnInit {
  public products: Products = NullProducts.instance();
  public currentContent: ProfileNavigationElementModel;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.route.data.subscribe(
      (navigationElement: ProfileNavigationElementModel) => {
        this.currentContent = navigationElement;
      });
    this.userService.subscribe(new SuccessLoader((user: User) => {
      this.productService.getMyProducts(user.userId).subscribe((myProducts: Products) => {
        this.products = myProducts;
      });
    }));
  }
}
