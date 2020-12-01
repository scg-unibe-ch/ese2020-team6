import { Directive, OnInit, ComponentFactoryResolver } from '@angular/core';
import { StageModel } from '../../../models/checkout/stage/stage.model'
import { Stagable } from './stagable';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { UserService } from '../../../services/user/user.service';
import { CheckoutRouteParametersModel } from '../../../models/checkout/checkout-route-parameters.model';
import { ProductModel, NullProduct } from '../../../models/product/product.model';
import { CutUserModel, NullCutUser } from '../../../models/user/cut-user.model';
import { UserModel, NullUser } from '../../../models/user/user.model';
import { SuccessLoader } from 'src/app/services/service.module';

@Directive({
  selector: '[stagable]'
})
export abstract class StagableExtention extends Stagable implements OnInit {

  public product: ProductModel = new NullProduct();
  public seller: CutUserModel = new NullCutUser();
  public buyer: UserModel = new NullUser();

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
        let sellerId: number = product.sellerId;
        this.userService.getUserById(sellerId).subscribe((seller: CutUserModel) => {
          this.seller = seller;
          this.assignSellerInput();
        })
      });
    });

    this.userService.subscribe(new SuccessLoader((user: UserModel) => {
      this.buyer = user;
      this.assignBuyerInput();
    }));

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

  private assignBuyerInput(): void {
    this.stages.forEach((stage: StageModel) => {
      stage.componentRef.instance.buyer = this.buyer;
    });
  }

  private assignIsFirstStageInput(): void {
    this.stages.forEach((stage: StageModel, index: number) => {
      stage.componentRef.instance.isFirstStage = index == 0;
    });
  }

}
