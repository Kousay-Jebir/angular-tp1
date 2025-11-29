import { Component, inject, computed, resource, signal } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from '../../services/logger.service';
import { CvService } from '../services/cv.service';
import { ListComponent } from '../list/list.component';
import { CvCardComponent } from '../cv-card/cv-card.component';
import { RouterModule } from '@angular/router';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    CvCardComponent,
    UpperCasePipe,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent {
  private cvService = inject(CvService);
  private toastr = inject(ToastrService);
  private logger = inject(LoggerService);
  cvsResource = resource({
    loader: async () => {
      this.toastr.info('Bienvenue dans CvTech');
      this.logger.logger('je suis le component cv');
      try {
        const list = await this.cvService.getCvs();
        this.toastr.info('CV chargés avec succès');
        return list;
      } catch {
        this.toastr.error('Attention, données fictives, problème serveur.');
        return this.cvService.getFakeCvs();
      }
    },
  });
  cvs = computed(() => this.cvsResource.value() ?? []);
  selectedCv = this.cvService.selectedCv;
  selectCv = (cv: Cv) => this.cvService.selectCv(cv);
  trackById = (_: number, cv: Cv) => cv.id;
  date = new Date();
}
