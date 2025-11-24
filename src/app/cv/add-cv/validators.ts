import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { CvService } from '../services/cv.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);

    return cvService.selectByProperty('cin', control.value).pipe(
      map(cvs => (cvs && cvs.length > 0 ? { cinTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}