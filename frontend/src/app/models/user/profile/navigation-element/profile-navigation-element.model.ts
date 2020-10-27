import { Type } from '@angular/core';

export interface ProfileNavigationElementModel {
  title: string;
  path: string;
  component: any;
  popupComponent: Type<any>;
}

export class NullProfileNavigationElement implements ProfileNavigationElementModel {
  title: string = null;
  path: string = null;
  component: any = null;
  popupComponent: Type<any> = null;
}
