import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { ProductInformationComponent } from 'src/app/components/home/product/product-information/product-information.component';
import { ProfileNavigationElementModel } from 'src/app/models/form/profile-navigation-element.model';
import { UserModel } from 'src/app/models/user/user.model';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { adminNavigationElements, defaultUserNavigationElements } from '../navigation-elements';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  products: any;
  public currentContent: ProfileNavigationElementModel;
  public userId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService) {
    // for routes with parameters
    const routes: Routes = [
      { path: 'user/profile/myproducts/:id' , component: ProductInformationComponent}
     ];
    }

  ngOnInit(): void {
    this.route.data.subscribe(
      (navigationElement: ProfileNavigationElementModel) => {
        this.currentContent = navigationElement;
      });
    if (this.userService.isLoggedIn) {
      this.userService.userObservable.subscribe((user: UserModel) => {
        this.userId = user.userId;
        this.productService.getMyProducts(this.userId).subscribe(data => {
          this.products = data;
        });
      });
    }
  }
}
