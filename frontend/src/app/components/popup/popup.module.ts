import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupComponent } from './popup.component';
import { ThemeModule } from 'src/app/models/theme/theme.module';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    ThemeModule
  ],
  exports: [
    PopupComponent
  ]
})
export class PopupModule { }
