import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { ThemeModule } from 'src/app/models/theme/theme.module';



@NgModule({
  declarations: [
    TooltipComponent
  ],
  imports: [
    ThemeModule,
    CommonModule
  ],
  exports: [
    TooltipComponent
  ]
})
export class TooltipModule {}
