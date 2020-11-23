import { Directive, Input, EventEmitter} from '@angular/core';
import { StageNDEmitter } from './stage-navigation-data-emitter.directive';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../../models/user/user.model';

@Directive({
  selector: '[stage-navigation-data-emitter-extention]'
})
export abstract class StageNDEExtention<T> extends StageNDEmitter<T> {

  private _product: ProductModel = new NullProduct();
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

  private _buyer: UserModel = new NullUser();
  @Input()
  set buyer(buyer: UserModel) {
    this._buyer = buyer;
    this.onBuyerLoad();
  }

  get buyer(): UserModel {
    return this._buyer;
  }

  protected abstract onProductLoad(): void;
  protected abstract onSellerLoad(): void;
  protected abstract onBuyerLoad(): void;

  @Input()
  isFirstStage: boolean = true;

}
