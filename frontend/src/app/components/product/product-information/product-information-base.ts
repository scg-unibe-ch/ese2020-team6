import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductModel, NullProduct } from 'src/app/models/product/product.model';
import { CutUserModel, NullCutUser } from 'src/app/models/user/cut-user.model';
import { UserModel, NullUser } from 'src/app/models/user/user.model';
export class ProductInformationBase {

  public product: ProductModel = NullProduct.instance();
  public seller: CutUserModel = NullCutUser.instance();
  public currentUser: UserModel = NullUser.instance();

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
      this.getCreator(product.sellerId);
    });
  }

  private getCreator(creatorId: number): void {
    this.userService.getUserById(creatorId).subscribe((cutUser: CutUserModel) => {
      this.seller = cutUser;
      this.getCurrentUser();
    });
  }

  private getCurrentUser(): void {
      // this.userService.events.onLoad((currentUser: UserModel) => {
      //   this.currentUser = currentUser;
      // });
  }
}
