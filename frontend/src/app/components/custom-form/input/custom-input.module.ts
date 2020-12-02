import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { TextInputComponent } from './base/text-input.component';
import { PasswordInputComponent } from './base/password-input.component';
import { NumberInputComponent } from './base/number-input.component';

import { DateComponent } from './date/date.component';
import { FileComponent } from './file/file.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  declarations: [
    TextInputComponent,
    PasswordInputComponent,
    NumberInputComponent,
    DateComponent,
    FileComponent,
    RadioComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    TextInputComponent,
    PasswordInputComponent,
    NumberInputComponent,
    DateComponent,
    FileComponent,
    RadioComponent
  ]
})
export class CustomInputModule { }
