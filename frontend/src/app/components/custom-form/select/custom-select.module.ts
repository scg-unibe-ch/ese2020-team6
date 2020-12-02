import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './single/select.component';
import { SelectMultipleComponent } from './multiple/select-multiple.component';
import { ThemeModule } from 'src/app/models/theme/theme.module';

@NgModule({
  declarations: [
    SelectComponent,
    SelectMultipleComponent
  ],
  imports: [
    ThemeModule,
    CommonModule
  ],
  exports: [
    SelectComponent,
    SelectMultipleComponent
  ]
})
export class CustomSelectModule { }
