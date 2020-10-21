import { Component, Input } from '@angular/core';
import { ProductModel, NullProduct } from '../../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../../models/user/cut-user.model';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html'
})
export class ProductPreviewComponent {

  @Input() product: ProductModel = new NullProduct();
  @Input() creator: CutUserModel = new NullCutUser();

}
