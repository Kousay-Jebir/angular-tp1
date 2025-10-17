// src/app/cv/cv/cv.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from '../../services/logger.service';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';
import { ListComponent } from '../list/list.component';
import { CvCardComponent } from '../cv-card/cv-card.component';
import { EmbaucheComponent } from '../embauche/embauche.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  imports: [
    CommonModule,
    ListComponent,
    CvCardComponent,
    EmbaucheComponent,
    UpperCasePipe,
    DatePipe,
  ],
})
export class CvComponent implements OnInit {
  private toastr = inject(ToastrService);
  private logger = inject(LoggerService);
  private cvService = inject(CvService);

  cvs = signal<Cv[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  date = new Date();

  async ngOnInit() {
    this.toastr.info('Bienvenue dans CvTech');
    this.logger.logger('je suis le component cv');
    this.loading.set(true);
    try {
      const list = await this.cvService.getCvs();
      this.cvs.set(list);
      this.error.set(null);
    } catch {
      this.cvs.set(this.cvService.getFakeCvs());
      this.error.set('Server error, using fake data');
      this.toastr.error(
        `Attention, données fictives, problème serveur. Contactez l’admin.`
      );
    } finally {
      this.loading.set(false);
    }
  }

  onSelect(cv: Cv) {
    this.cvService.selectCv(cv);
  }
  selectedCv = this.cvService.selectedCv;
  selectCv = (cv: Cv) => this.cvService.selectCv(cv);

  trackById = (_: number, cv: Cv) => cv.id;
}
