import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductTypeValidator } from './directive/product-type-validator.directive';
import { OfferTypeValidator } from './directive/offer-type-validator.directive';
import { DeliverableValidator } from './directive/deliverable-validator.directive';
import { GenderValidator } from './directive/gender-validator.directive';

@NgModule({
  declarations: [
    ProductTypeValidator,
    OfferTypeValidator,
    DeliverableValidator,
    GenderValidator
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductTypeValidator,
    OfferTypeValidator,
    DeliverableValidator,
    GenderValidator
  ]
})
export class SelectValidatorModule { }
