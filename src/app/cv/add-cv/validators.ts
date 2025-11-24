import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const cinAgeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const age: unknown = control.get('age')?.value;
  const cin: string | null = control.get('cin')?.value;

  if (age == null || !cin || cin.length < 2) {
    return null;
  }

  const ageNumber = Number(age);
  if (!Number.isNaN(ageNumber) && ageNumber >= 60) {
    const regexForOld = /^(0[0-9]|1[0-9])[0-9]{6}$/;
    return regexForOld.test(cin) ? null : { cinAgeMismatch: true };
  }

  const regexForYoung = /^([2-9][0-9])[0-9]{6}$/;
  return regexForYoung.test(cin) ? null : { cinAgeMismatch: true };
};
