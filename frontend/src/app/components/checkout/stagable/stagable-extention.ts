import { Directive, OnInit, ViewChild, ComponentFactoryResolver, EventEmitter, Type } from '@angular/core';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { StagesDirective } from './stages.directive';
import { StageNDEExtention } from './stage/stage-navigation-data-emitter-extention.directive';
import { Stagable } from './stagable';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { UserService } from '../../../services/user/user.service';
import { CheckoutRouteParametersModel } from '../../../models/checkout/checkout-route-parameters.model';
import { ProductModel, NullProduct } from '../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../models/user/user.model';

@Directive({
  selector: '[stagable]'
})
export class StagableExtention extends Stagable implements OnInit {

  public product: ProductModel = new NullProduct();
  public seller: CutUserModel = new NullCutUser();
  public user: UserModel = new NullUser();

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    stages: Array<StageModel>,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService
  ) {
    super(componentFactoryResolver, stages);
  }

  public ngOnInit(): void{
    super.ngOnInit();

    this.route.parent.params.subscribe((parameters: CheckoutRouteParametersModel) => {
      let productId: number = parameters.productId;
      this.productService.getProductById(productId)
      .subscribe((product: ProductModel) => {
        this.product = product;
        this.assignProductInput();
        let sellerId: number = product.userId;
        this.userService.getUserById(sellerId).subscribe((seller: CutUserModel) => {
          this.seller = seller;
          this.assignSellerInput();
        })
      });
    });

    this.userService.userObservable.subscribe((user: UserModel) => {
      this.user = user;
      this.assignUserInput();
    });

    this.assignIsFirstStageInput();
  }

  private assignProductInput(): void {
    this.stages.forEach((stage: StageModel) => {
      stage.componentRef.instance.product = this.product;
    });
  }

  private assignSellerInput(): void {
    this.stages.forEach((stage: StageModel) => {
      stage.componentRef.instance.seller = this.seller;
    });
  }

  private assignUserInput(): void {
    this.stages.forEach((stage: StageModel) => {
      stage.componentRef.instance.user = this.user;
    });
  }

  private assignIsFirstStageInput(): void {
    this.stages.forEach((stage: StageModel, index: number) => {
      stage.componentRef.instance.isFirstStage = index == 0;
    });
  }

}
