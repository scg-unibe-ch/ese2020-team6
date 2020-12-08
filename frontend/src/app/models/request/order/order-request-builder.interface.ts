import { ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StagableExtention } from 'src/app/components/checkout/stagable/stagable-extention';
import { StageModel } from 'src/app/models/checkout/stage/stage.model';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderRequestModel } from './order-request.model';
import { OrderResponseModel } from 'src/app/models/response/response.module';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { PopupService } from 'src/app/services/popup/popup.service';


export abstract class OrderRequestBuilder<S extends OrderRequestModel, T extends OrderResponseModel> extends StagableExtention {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    stages: Array<StageModel>,
    route: ActivatedRoute,
    productService: ProductService,
    userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private popupService: PopupService
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
      this.popupService.openPopup('root', 'Your order has peen placed!', 'success')
      this.router.navigate(['user', 'profile', 'buyer']);
    }, (err: any) => {
      this.popupService.openPopup('root', err.error.message, 'warn')
      this.errorEmitter.emit(err.error.message);
    });
  }
}
