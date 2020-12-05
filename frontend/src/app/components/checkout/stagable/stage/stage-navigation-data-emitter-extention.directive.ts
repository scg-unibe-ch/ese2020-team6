import { Directive, Input, EventEmitter} from '@angular/core';
import { StageNDEmitter } from './stage-navigation-data-emitter.directive';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, User } from '../../../../models/user/user.model';

@Directive({
  selector: '[stage-navigation-data-emitter-extention]'
})
export abstract class StageNDEExtention<T> extends StageNDEmitter<T> {

  private _product: ProductModel = NullProduct.instance();
  @Input()
  set product(product: ProductModel) {
    this._product = product;
    this.onProductLoad();
  }

  get product(): ProductModel {
    return this._product;
  }

  private _seller: CutUserModel = new NullCutUser();
  @Input()
  set seller(seller: CutUserModel) {
    this._seller = seller;
    this.onSellerLoad();
  }

  get seller(): CutUserModel {
    return this._seller;
  }

  private _buyer: User = User.NullUser;
  @Input()
  set buyer(buyer: User) {
    this._buyer = buyer;
    this.onBuyerLoad();
  }

  get buyer(): User {
    return this._buyer;
  }

  protected abstract onProductLoad(): void;
  protected abstract onSellerLoad(): void;
  protected abstract onBuyerLoad(): void;

  @Input()
  isFirstStage: boolean = true;

}
