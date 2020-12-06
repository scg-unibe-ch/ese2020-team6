import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { LoadingIndicatorComponent } from './indicator/loading-indicator.component';

@NgModule({
  declarations: [
    LoaderComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
