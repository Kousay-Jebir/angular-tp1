import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { APP_ROUTES } from 'src/config/routes.config';
import { Cv } from '../model/cv';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CvService } from '../services/cv.service';
import { Component } from '@angular/core';
import { cinAgeValidator } from './validators';
import { FormPersistenceService } from '../services/form_persistence.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent {
  private readonly FORM_KEY = 'addCvForm';

  form = this.formBuilder.group(
    {
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
        },
      ],
    },
    {
      validators: [cinAgeValidator],
    }
  );

  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private persistence: FormPersistenceService<any>
  ) {
    const savedFormSubject = this.persistence.getFormSubject(this.FORM_KEY, this.form.value);
    const savedValue = savedFormSubject.getValue();
    if (savedValue) {
      this.form.patchValue(savedValue);
    }

    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: any) => savedFormSubject.next(value));

    this.applyPathValidators(this.age.value);
    this.age.valueChanges.subscribe((ageValue) => this.applyPathValidators(ageValue));
  }

  private applyPathValidators(ageValue: unknown): void {
    const ageNumber = Number(ageValue);

    if (!Number.isNaN(ageNumber) && ageNumber < 18) {
      this.path.setValidators([
        (control: AbstractControl): ValidationErrors | null =>
          control.value ? { underagePathNotAllowed: true } : null,
      ]);
      this.path.setValue('');
    } else {
      this.path.setValidators([]);
    }

    this.path.updateValueAndValidity();
  }

  addCv() {
    if (this.form.invalid) {
      this.toastr.error('Veuillez remplir correctement tous les champs.');
      return;
    }

    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv: Cv) => {
        this.persistence.clear(this.FORM_KEY);

        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name} a été ajouté`);
      },
      error: () => {
        this.toastr.error(
          `Une erreur s'est produite, veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname(): AbstractControl {
    return this.form.get('firstname')!;
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job(): AbstractControl {
    return this.form.get('job')!;
  }
  get path(): AbstractControl {
    return this.form.get('path')!;
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}