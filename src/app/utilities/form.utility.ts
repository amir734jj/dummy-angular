import {FormGroup, ValidationErrors} from '@angular/forms';
import * as _ from 'lodash';

export type FormErrorTable = { key: string, keyError: string, validationError: ValidationErrors }[];

export const resolveFormGroupErrors = (form: FormGroup): FormErrorTable => {
  return _.flatten(Object.keys(form.controls).map(key => {
    const controlErrors = form.get(key)!.errors;
    if (controlErrors != null) {
      return Object.keys(controlErrors).map(keyError => ({
        key,
        keyError,
        validationError: controlErrors[keyError]
      }));
    } else {
      return [];
    }
  }));
};
