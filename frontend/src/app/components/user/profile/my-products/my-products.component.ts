import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileNavigationElementModel } from 'src/app/models/user/profile/navigation-element/profile-navigation-element.model';
import { UserModel } from 'src/app/models/user/user.model';
import { ProductModel } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html'
})
export class MyProductsComponent implements OnInit {
  public products: Array<ProductModel>;
  public currentContent: ProfileNavigationElementModel;
  public userId: number;

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
    this.userService.subscribe(new SuccessLoader((user: UserModel) => {
      this.userId = user.userId;
      this.productService.getMyProducts(this.userId).subscribe(data => {
        this.products = data;
      });
    }));
  }
}
