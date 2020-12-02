import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './single/select.component';
import { SelectMultipleComponent } from './multiple/select-multiple.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectMultipleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectComponent,
    SelectMultipleComponent
  ]
})
export class CustomSelectModule { }
