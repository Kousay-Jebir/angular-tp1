import { Component, inject, computed, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CvService } from '../cv/services/cv.service';
import { ListComponent } from '../cv/list/list.component';
import { Cv } from '../cv/model/cv';

@Component({
  selector: 'app-master-details-cv',
  standalone: true,
  imports: [CommonModule, RouterModule, ListComponent],
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css',
})
export class MasterDetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  cvsResource = resource({
    loader: async () => {
      try {
        return await this.cvService.getCvs();
      } catch {
        return this.cvService.getFakeCvs();
      }
    },
  });
  cvs = computed(() => this.cvsResource.value() ?? []);
  selectedCv = this.cvService.selectedCv;
  onSelect(cv: Cv): void {
    this.cvService.selectCv(cv);
    this.router.navigate([cv.id], { relativeTo: this.activatedRoute });
  }
  trackById = (_: number, cv: Cv) => cv.id;
}
