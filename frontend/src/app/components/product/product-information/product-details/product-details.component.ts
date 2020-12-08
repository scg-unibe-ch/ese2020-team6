import { Component, Input } from '@angular/core';
import { Product, NullProduct } from 'src/app/models/product/product.model';
import { NullCutUser, CutUser } from 'src/app/models/user/cut-user.model';
import { Thread, NullThread } from 'src/app/models/message/thread.model';
import { Message } from 'src/app/models/message/message.model';
import { MessageService } from 'src/app/services/message/message.service';
import { UserService } from 'src/app/services/user/user.service';
import { Threads } from 'src/app/models/message/threads.model';
import { SuccessLoader } from 'src/app/services/service.module';
import { NullUser, User } from 'src/app/models/user/user.model';
import { Participants } from 'src/app/models/message/participants.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  private getThread(): void {
    this.messageService.subscribe(new SuccessLoader((threads: Threads) => {
      this.thread = threads.getByProduct(this.product);
    }))
  }
  private updateThread(): void {
    if (
      !(this.product instanceof NullProduct) &&
      !(this.sender instanceof NullUser)
    ) this.getThread();
  }

  @Input()
  public messages: boolean = false;

  private _thread: Thread = NullThread.instance();
  set thread(thread: Thread) {
    if (!(thread instanceof NullThread)) this._thread = thread;
    else {
      this.thread = new Thread(
        this.product, new Participants(this.product.seller, [this.sender]), false, new Array<Message>()
      );
      this.thread.currentSender = this.sender;
    }
  }
  get thread(): Thread { return this._thread; }



  private _product: Product = NullProduct.instance();
  @Input()
  set product(product: Product) {
    this._product = product;
    this.updateThread();
  }
  get product() { return this._product; }



  private _sender: CutUser = NullCutUser.instance();
  set sender(sender: CutUser) {
    this._sender = sender;
    this.updateThread();
  }
  get sender(): CutUser { return this._sender; }



  @Input()
  public isPreview: boolean;
  @Input()
  public picture: any;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.userService.subscribe(new SuccessLoader((sender: User) => this.sender = CutUser.buildFromUser(sender)));
  }

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
}
