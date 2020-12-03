import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors  } from '@angular/forms';

@Directive({
  selector: '[mapSearchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MapSearchValidator,
    multi: true
  }]
})
export class MapSearchValidator {

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) return null;
    else return {
      mapSearch: {
      errorName: "ErrorName",
      errorMessages: ['Plaease search for your home address.']
    }}
  }
}
