import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { debounceTime, distinctUntilChanged, switchMap, tap, of } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { Router } from "@angular/router";

@Component({
  selector: "app-autocomplete",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  fb = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);

  results: Cv[] = [];
  open = false;

  form = this.fb.group({
    search: [""],
  });

  get search(): FormControl {
    return this.form.get("search") as FormControl;
  }

  constructor() {
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.open = true;
      }),
      switchMap((text: string) => {
        if (!text || !text.trim()) {
          this.results = [];
          return of([]);
        }
        return this.cvService.selectByName(text);
      })
    ).subscribe({
      next: (cvs) => {
        this.results = cvs;
      }
    });
  }

  select(cv: Cv) {
    this.router.navigate(['/cv', cv.id]);
  }

}