import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductModel, NullProduct } from 'src/app/models/product/product.model';
export class ProductInformationBase {

  public product: ProductModel = NullProduct.instance();

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
    });
  }
}
