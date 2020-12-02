import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ValidatorModule } from './validator/validator.module';
import { CustomInputModule } from './input/custom-input.module';
import { CustomSelectModule } from './select/custom-select.module';

import { TextAreaComponent } from './text-area/text-area.component';
import { MapSearchComponent } from './map-search/map-search.component';

@NgModule({
  declarations: [
    TextAreaComponent,
    MapSearchComponent,
  ],
  imports: [
    FormsModule,
    ValidatorModule,
    CustomInputModule,
    CustomSelectModule,
    CommonModule
  ],
  exports: [
    ValidatorModule,
    CustomInputModule,
    CustomSelectModule,
    TextAreaComponent,
    MapSearchComponent
  ]
})
export class CustomFormModule { }
