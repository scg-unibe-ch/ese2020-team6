import { Directive, Input, EventEmitter} from '@angular/core';
import { StageNDEmitter } from './stage-navigation-data-emitter.directive';
import { ProductModel, NullProduct } from '../../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../../models/user/user.model';

@Directive({
  selector: '[stage-navigation-data-emitter-extention]'
})
export abstract class StageNDEExtention<T> extends StageNDEmitter<T> {

  @Input()
  product: ProductModel = new NullProduct();

  @Input()
  seller: CutUserModel = new NullCutUser();

  @Input()
  user: UserModel = new NullUser();

}
