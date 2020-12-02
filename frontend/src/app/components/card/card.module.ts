import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Card from './card.index';



@NgModule({
  declarations: [
    Card.CenterCardComponent,
    Card.TopCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Card.CenterCardComponent,
    Card.TopCardComponent
  ]
})
export class CardModule { }
