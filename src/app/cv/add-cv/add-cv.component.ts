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

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent {
  constructor(
    private cvService: CvService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    // initial rule application
    this.applyPathValidators(this.age.value);

    // subscribe to age changes
    this.age.valueChanges.subscribe((ageValue) => {
      this.applyPathValidators(ageValue);
    });
  }

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
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv: Cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: () => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path(): AbstractControl {
    return this.form.get('path')!;
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
