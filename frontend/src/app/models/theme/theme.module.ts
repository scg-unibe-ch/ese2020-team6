import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeDirective } from './theme.directive';
import { ButtonDirective } from './button/button.directive';
import { ButtonWarnDirective } from './button/button-warn.directive';
import { ButtonEmptyDirective } from './button/button-empty.directive'


@NgModule({
  declarations: [
    ThemeDirective,
    ButtonDirective,
    ButtonWarnDirective,
    ButtonEmptyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeDirective,
    ButtonDirective,
    ButtonWarnDirective,
    ButtonEmptyDirective
  ]
})
export class ThemeModule { }
