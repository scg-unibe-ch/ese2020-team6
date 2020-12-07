import { Component, Input} from '@angular/core';
import { ProductModel, NullProduct } from 'src/app/models/product/product.model';
import { CutUserModel, NullCutUser } from 'src/app/models/user/cut-user.model';


@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent {
  @Input() isPreview = false;
  @Input() product: ProductModel = NullProduct.instance();
  @Input() creator: CutUserModel = new NullCutUser();
  @Input() picture: any;
}
