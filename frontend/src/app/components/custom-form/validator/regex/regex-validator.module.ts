import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HouseNumberValidator } from './directive/house-number-validator.directive';
import { NounValidator } from './directive/noun-validator.directive';
import { PhonenumberValidator } from './directive/phonenumber-validator.directive';
import { PlzValidator } from './directive/plz-validator.directive';
import { UsernameValidator } from './directive/username-validator.directive';
import { UsernameOrEmailValidator } from './directive/username-or-email-validator.directive';
import { EmailValidator } from './directive/email-validator.directive';
import { PasswordValidator } from './directive/password-validator.directive';
import { TitleValidator } from './directive/title-validator.directive';
import { DescriptionValidator } from './directive/description-validator.directive';
import { PriceValidator } from './directive/price-validator.directive';
import { LocationValidator } from './directive/location-validator.directive';
import { MessageValidator } from './directive/message-validator.directive';
import { HoursValidator } from './directive/hours-validator.directive';


@NgModule({
  declarations: [
    HouseNumberValidator,
    NounValidator,
    PhonenumberValidator,
    PlzValidator,
    UsernameValidator,
    UsernameOrEmailValidator,
    EmailValidator,
    PasswordValidator,
    TitleValidator,
    DescriptionValidator,
    PriceValidator,
    LocationValidator,
    MessageValidator,
    HoursValidator,
    HouseNumberValidator,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    HouseNumberValidator,
    NounValidator,
    PhonenumberValidator,
    PlzValidator,
    UsernameValidator,
    UsernameOrEmailValidator,
    EmailValidator,
    PasswordValidator,
    TitleValidator,
    DescriptionValidator,
    PriceValidator,
    LocationValidator,
    MessageValidator,
    HoursValidator,
  ]
})
export class RegexValidatorModule { }
