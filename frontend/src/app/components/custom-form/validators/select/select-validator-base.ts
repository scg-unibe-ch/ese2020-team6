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
    let regExString: string = '^';
    let isFirstOption: boolean = true;
    this.select.options.forEach((option: string, index: number) => {
      if (isFirstOption) isFirstOption = !isFirstOption;
      else regExString += '|';
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
  category: {
    name: 'categoryValidator',
    options: [
      'Houses',
      'Pets',
      'Nice Stuff'
    ]
  },
  subcategory: {
    name: 'subcategoryValidator',
    options: [
      'sub_Houses',
      'sub_Pets',
      'sub_NiceStuff'
    ]
  },
  status: {
    name: 'statusValidator',
    options: [
      'Available',
      'Lent',
      'Sold'
    ]
  },
  deliverable: {
    name: 'deliverableValidator',
    options: [
      'Yes',
      'No'
    ]
  }
}
