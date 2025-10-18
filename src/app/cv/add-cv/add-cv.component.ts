import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { APP_ROUTES } from 'src/config/routes.config';
import { JsonPipe } from '@angular/common';

function cinAndAgeValidator(group: AbstractControl) {
  const cin = group.get('cin')?.value as string;
  const age = Number(group.get('age')?.value);
  if (cin && age && age < 18) return { cinFirstCars: true };
  return null;
}

@Component({
  selector: 'app-add-cv',
  standalone: true,
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
})
export class AddCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  form = this.fb.group(
    {
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      age: [0, [Validators.required, Validators.min(0)]],
    },
    { validators: cinAndAgeValidator }
  );

  async addCv() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      const created = await this.cvService.addCv(this.form.value as Cv);
      this.toastr.success(
        `Le CV ${created.firstname} ${created.name} a été ajouté`
      );
      await this.router.navigate([APP_ROUTES.cv]);
    } catch {
      this.toastr.error(
        `Une erreur s'est produite. Veuillez contacter l'admin.`
      );
    }
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
