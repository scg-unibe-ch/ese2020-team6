import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegexValidatorModule } from './regex/regex-validator.module';
import { SelectValidatorModule } from './select/select-validator.module';
import { MapSearchValidator } from './directive/map-search-validator.directive';
import { DateValidator } from './directive/date-validator.directive';
import { PasswordMatchValidator } from './directive/password-match-validator.directive';

@NgModule({
  declarations: [
    MapSearchValidator,
    DateValidator,
    PasswordMatchValidator
  ],
  imports: [
    RegexValidatorModule,
    SelectValidatorModule,
    CommonModule
  ],
  exports: [
    RegexValidatorModule,
    SelectValidatorModule,
    MapSearchValidator,
    DateValidator,
    PasswordMatchValidator
  ]
})
export class ValidatorModule { }
