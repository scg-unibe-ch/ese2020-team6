import { AbstractControl, Validator } from '@angular/forms';
import { SelectModel } from '../../../../models/custom-form/select.model';

export class SelectValidatorBase implements Validator {
  errorMessage: string;

  constructor(
    private select: SelectModel
  ){ }

  validate(control: AbstractControl): {[key: string]: any} | null {
    if (control.value != null) {
      if (this.getRegexFromOptions().test(control.value))
      {
        return null;
      }
    }
    return {errorMessage: {name: this.select.name, message: 'The selected Option is not allowed!'}};
  }

  private getRegexFromOptions(): RegExp {
    let regExString = '^';
    let isFirstOption = true;
    this.select.options.forEach((option: string) => {
      if (isFirstOption) { isFirstOption = !isFirstOption; }
      else { regExString += '|'; }
      regExString += option;
    });
    regExString += '$';
    return new RegExp(regExString);
  }
}

export const validatorSelect = {
  productType: {
    name: 'productTypeValidator',
    options: [
      'Item',
      'Service'
    ]
  },
  gender: {
    name: 'genderValidator',
    options: [
      'Male',
      'Female',
      'Other'
    ]
  },
  offerType: {
    name: 'offerTypeValidator',
    options: [
      'Sell',
      'Rent'
    ]
  },
  // category: {
  //   name: 'categoryValidator',
  //   options: [
  //     'living',
  //     'pets'
  //   ]
  // },
  // subcategory: {
  //   name: 'subcategoryValidator',
  //   options: [
  //     'dogs',
  //     'cats',
  //     'garages',
  //     'houses'
  //   ]
  // },
  deliverable: {
    name: 'deliverableValidator',
    options: [
      'Yes',
      'No'
    ]
  }
}
