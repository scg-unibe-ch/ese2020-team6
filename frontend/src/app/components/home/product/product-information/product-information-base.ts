import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
// Models
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../../models/user/user.model';

export class ProductInformationBase {

  public product: ProductModel = new NullProduct();
  public creator: CutUserModel = new NullCutUser();
  public currentUser: UserModel = new NullUser();

  constructor(
    protected route: ActivatedRoute,
    protected productService: ProductService,
    protected userService: UserService,
  ) {
    this.route.parent.params.subscribe((params: {productId: string}) => {
      this.getProduct(parseInt(params.productId, 10));
    });
  }

  private getProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: any) => {
      this.product = product;
      this.getCreator(product.userId);
    });
  }

  private getCreator(creatorId: number) {
    this.userService.getUserById(creatorId).subscribe((cutUser: CutUserModel) => {
      this.creator = cutUser;
      if (this.userService.isLoggedIn) {
        this.getCurrentUser();
      }
    });
  }

  private getCurrentUser() {
      this.userService.userObservable.subscribe((currentUser: UserModel) => {
        this.currentUser = currentUser;
      });
  }
}
