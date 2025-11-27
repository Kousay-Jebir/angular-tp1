import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CvService } from '../cv/services/cv.service';
import { Cv } from '../cv/model/cv';
import { ListComponent } from '../cv/list/list.component';

@Component({
    selector: 'app-master-details-cv',
    imports: [CommonModule, RouterModule, ListComponent],
    templateUrl: './master-details-cv.component.html',
    styleUrl: './master-details-cv.component.css'
})
export class MasterDetailsCvComponent implements OnInit, OnDestroy {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  cvs = signal<Cv[]>([]);
  selectedCv = this.cvService.selectedCv;

  async ngOnInit(): Promise<void> {
    try {
      const list = await this.cvService.getCvs();
      this.cvs.set(list);
    } catch {
      this.cvs.set(this.cvService.getFakeCvs());
    }
  }

  ngOnDestroy(): void {
    this.cvService.selectCv(null);
  }

  onSelect(cv: Cv): void {
    this.cvService.selectCv(cv);
    this.router.navigate([cv.id], { relativeTo: this.activatedRoute });
  }

  trackById = (_: number, cv: Cv) => cv.id;
}
