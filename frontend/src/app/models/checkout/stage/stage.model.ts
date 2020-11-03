import { Type, ComponentRef } from '@angular/core';
import { Stage } from '../../../components/checkout/stagable/stage/stage';

export interface StageModel {
  title: string;
  component: Type<Stage<any>>;
  componentRef: ComponentRef<any>;
}
