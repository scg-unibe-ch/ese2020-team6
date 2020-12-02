import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/models/theme/theme.module';

import { CenterCardComponent } from './center/center-card.component';
import { TopCardComponent } from './top/top-card.component';



@NgModule({
  declarations: [
    CenterCardComponent,
    TopCardComponent
  ],
  imports: [
    ThemeModule,
    CommonModule
  ],
  exports: [
    CenterCardComponent,
    TopCardComponent
  ]
})
export class CardModule { }
