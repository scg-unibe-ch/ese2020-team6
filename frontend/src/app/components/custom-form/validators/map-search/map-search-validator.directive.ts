import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors  } from '@angular/forms';

@Directive({
  selector: '[mapSearchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MapSearchValidatorDirective,
    multi: true
  }]
})
export class MapSearchValidatorDirective {

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) return null;
    else return {
      mapSearch: {
      errorName: "ErrorName",
      errorMessages: ['Plaease search for your home address.']
    }}
  }
}
