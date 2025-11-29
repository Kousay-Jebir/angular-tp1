import { Component, inject, signal, resource, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { DefaultImagePipe } from '../pipes/default-image.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-cv',
  standalone: true,
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
  imports: [
    CommonModule,
    DefaultImagePipe,
    RouterModule
  ],
})
export class DetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  authService = inject(AuthService);

  id = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => Number(params.get('id')) || 0)
    ),
    { initialValue: 0 }
  );

  cvResource = resource<Cv | null, { id: number }>({
    request: () => ({ id: this.id() }),
    loader: ({ request }) =>
      request.id > 0
        ? this.cvService.getCvById(request.id)
        : Promise.resolve(null),
    defaultValue: null
  });

  cv = computed(() => this.cvResource.value());
  isLoading = computed(() => this.cvResource.isLoading());
  error = computed(() => this.cvResource.error());
  status = computed(() => this.cvResource.status());
  hasValidId = computed(() => this.id() > 0);

  async deleteCv(cv: Cv): Promise<void> {
    await this.cvService.deleteCvById(cv.id);
    this.cvService.selectCv(null);
    await this.router.navigate([APP_ROUTES.cv]);
  }

  reloadCv(): void {
    this.cvResource.reload();
  }
}
