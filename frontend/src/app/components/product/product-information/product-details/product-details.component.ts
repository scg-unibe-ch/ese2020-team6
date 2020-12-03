import { Component, Input } from '@angular/core';
import { ProductModel, NullProduct } from 'src/app/models/product/product.model';
import { CutUserModel, NullCutUser } from 'src/app/models/user/cut-user.model';

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
  @Input()
  public isPreview: boolean;
  @Input()
  public picture: any;

  constructor(
  ) {}

  public statusIndicatorPillColorClass: () => string = () => {
    const status: string = this.product.status;
    if (status) {
      if (status === 'Available') { return 'success'; }
      else if (status === 'Sold' || status === 'Lent') { return 'warn'; }
    } else { return ''; }
  }

  public deliverableIndicatorPillColorClass: () => string = () => {
    const isDeliverable: boolean = this.product.isDeliverable;
    if (isDeliverable === true || isDeliverable === false) {
      if (isDeliverable) { return 'success'; }
      else { return 'warn'; }
    } else { return ''; }
  }

  get priceLabel(): string {
    if (this.product.productType === 'Service' || this.product.offerType === 'Rent') { return '$/h'; }
    else { return '$'; }
  }

  formatExpirationDate(): any {
    let expirationDate: string;
    expirationDate = String(this.product.expirationDate);
    expirationDate = expirationDate.substring(0, 10);
    return expirationDate;
  }
}
