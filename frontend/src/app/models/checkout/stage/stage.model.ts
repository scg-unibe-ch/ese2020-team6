import { Type, ComponentRef } from '@angular/core';
import { StageNavigationDataEmitter } from '../../../components/checkout/stagable/stage/stage-navigation-data-emitter.directive';

export interface StageModel {
  title: string;
  component: Type<StageNavigationDataEmitter<any>>;
  componentRef: ComponentRef<any>;
}
