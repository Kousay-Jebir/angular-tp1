import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  cv: Cv | null = null;

  async ngOnInit(): Promise<void> {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    try {
      this.cv = await this.cvService.getCvById(id);
    } catch {
      this.toastr.error(`Impossible de charger ce CV`);
      await this.router.navigate([APP_ROUTES.cv]);
    }
  }

  async deleteCv(cv: Cv): Promise<void> {
    try {
      await this.cvService.deleteCvById(cv.id);
      this.toastr.success(`${cv.name} supprimé avec succès`);
      await this.router.navigate([APP_ROUTES.cv]);
    } catch {
      this.toastr.error(`Problème serveur, veuillez contacter l'admin`);
    }
  }
}
