import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../../models/user/user.model';
import { Themable } from '../../../../models/theme/themable';
import { ThemeService } from '../../../../services/theme/theme.service';

export class ProductInformationBase extends Themable {

  public product: ProductModel = new NullProduct();
  public creator: CutUserModel = new NullCutUser();
  public currentUser: UserModel = new NullUser();

  constructor(
    protected route: ActivatedRoute,
    protected productService: ProductService,
    protected userService: UserService,
    themeService: ThemeService
  ) {
    super(themeService);

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

  private getCreator(creatorId: number): void {
    this.userService.getUserById(creatorId).subscribe((cutUser: CutUserModel) => {
      this.creator = cutUser;
      if (this.userService.isLoggedIn) {
        this.getCurrentUser();
      }
    });
  }

  private getCurrentUser(): void {
      this.userService.userObservable.subscribe((currentUser: UserModel) => {
        this.currentUser = currentUser;
      });
  }
}
