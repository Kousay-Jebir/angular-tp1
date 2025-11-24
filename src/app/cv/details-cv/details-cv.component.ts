import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
  selector: 'app-details-cv',
  standalone: true,
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
  imports: [CommonModule, DefaultImagePipe],
})
export class DetailsCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  authService = inject(AuthService);

  cv: Cv | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = Number(params.get('id'));
        void this.loadCv(id);
      });
  }

  async deleteCv(cv: Cv): Promise<void> {
    await this.cvService.deleteCvById(cv.id);
    this.cvService.selectCv(null);
    await this.router.navigate([APP_ROUTES.cv]);
  }

  private async loadCv(id: number): Promise<void> {
    this.cv = await this.cvService.getCvById(id);
    this.cvService.selectCv(this.cv);
  }
}
