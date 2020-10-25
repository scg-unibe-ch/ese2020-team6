import { Component } from '@angular/core';

export interface ProfileNavigationElementModel {
  title: string;
  path: string;
  component: any;
}

export class NullProfileNavigationElement implements ProfileNavigationElementModel {
  title: string = null;
  path: string = null;
  component: any = null;
}
