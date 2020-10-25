import { Component, Input} from '@angular/core';
import { ProductModel, NullProduct } from '../../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../../models/user/cut-user.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  @Input()
  public product: ProductModel = new NullProduct();
  @Input()
  public creator: CutUserModel = new NullCutUser();

  public statusIndicatorPillColorClass: () => string = () => {
    let status: string = this.product.status;
    if (status) {
      if (status === 'Available') return 'success';
      else if (status === 'Sold' || status === 'Lent') return 'warn';
    } else return '';
  }

  public deliverableIndicatorPillColorClass: () => string = () => {
    let isDeliverable: boolean = this.product.isDeliverable;
    if (isDeliverable == true || isDeliverable == false) {
      if (isDeliverable) return 'success';
      else return 'warn';
    } else return '';
  }

  get priceLabel(): string {
    if (this.product.productType === 'Service' || this.product.offerType === 'Rent') return '$/h';
    else return '$';
  }
}
