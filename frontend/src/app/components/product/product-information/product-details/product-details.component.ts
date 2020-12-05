import { Component, Input } from '@angular/core';
import { Product, NullProduct } from 'src/app/models/product/product.model';
import { CutUserModel, NullCutUser } from 'src/app/models/user/cut-user.model';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { Message } from 'src/app/models/message/message.model';
import { User } from 'src/app/models/user/user.model';
import { MessageService } from 'src/app/services/message/message.service';
import { UserService } from 'src/app/services/user/user.service';
import { Threads } from 'src/app/models/message/threads.model';
import { SuccessLoader } from 'src/app/services/service.module';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  public thread: Thread = NullThread.instance();

  private _product: Product = NullProduct.instance();
  @Input()
  set product(product: Product) {
    this._product = product;
    this.messageService.subscribe(new SuccessLoader((threads: Threads) => {
      let foundThread = threads.getByProduct(product);
      if (foundThread instanceof NullThread) {
        this.userService.subscribe(new SuccessLoader((sender: CutUserModel) => {
          if (sender.userId === product.sellerId) throw new Error("Seller can not send message to himself!");
          this.userService.getUserById(product.sellerId).subscribe((seller: CutUserModel) => {
            this.thread = new Thread(product, [seller, sender], false, new Array<Message>());
          })
        }))
        new Thread(product, [User.NullUser, User.NullUser], false, new Array<Message>())
      } else this.thread = foundThread;
    }));

  }
  get product() {
    return this._product;
  }
  @Input()
  public creator: CutUserModel = new NullCutUser();
  @Input()
  public isPreview: boolean;
  @Input()
  public picture: any;

  constructor(
    private messageService: MessageService,
    private userService: UserService
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
