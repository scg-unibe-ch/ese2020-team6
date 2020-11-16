import { Type, ComponentRef } from '@angular/core';
import { StageNDEExtention } from '../../../components/checkout/stagable/stage/stage-navigation-data-emitter-extention.directive';

export interface StageModel {
  title: string;
  component: Type<StageNDEExtention<any>>;
  componentRef: ComponentRef<any>;
}
