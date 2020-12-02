import { ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StagableExtention } from '../../../../components/checkout/stagable/stagable-extention';
import { StageModel } from '../../../../models/checkout/stage/stage.model';
import { OrderService } from '../../../../services/order/order.service';
import { OrderRequestModel } from './order-request.model';
import { OrderResponseModel } from '../../../response/order/order-response-model.module';
import { ProductService } from '../../../../services/product/product.service';
import { UserService } from '../../../../services/user/user.service';


export abstract class OrderRequestBuilder<S extends OrderRequestModel, T extends OrderResponseModel> extends StagableExtention {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    stages: Array<StageModel>,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {
    super(
      componentFactoryResolver,
      stages,
      route,
      productService,
      userService
    );
  }

  protected abstract _endpointURLExtention: string;
  get endpointURLExtention(): string {
    return this._endpointURLExtention;
  }

  protected abstract buildOrderRequest(): S;
  get request(): S {
    return this.buildOrderRequest();
  }

  protected finalize: (stageIndex: number, data?: any) => void = (stageIndex: number): void => {
    this.orderService.orderProduct<S, T, OrderRequestBuilder<S, T>>(this)
    .subscribe(() => {
      this.router.navigate(['user', 'profile', 'buyer']);
    }, (err: any) => {
      this.errorEmitter.emit(err.error.message);
    });
  }
}
