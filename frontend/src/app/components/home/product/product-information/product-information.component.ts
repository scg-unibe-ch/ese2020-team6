import { Component, Input} from '@angular/core';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent {
  @Input() isPreview = false;
  @Input() product: ProductModel = new NullProduct();
  @Input() creator: CutUserModel = new NullCutUser();
  @Input() picture: any;
}
