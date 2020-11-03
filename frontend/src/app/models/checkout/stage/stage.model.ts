import { Type, ComponentRef } from '@angular/core';

export interface StageModel {
  title: string;
  component: Type<any>;
  componentRef: ComponentRef<any>;
}
