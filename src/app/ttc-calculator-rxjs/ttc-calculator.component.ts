import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, combineLatest, map, startWith, Observable } from 'rxjs';

interface TtcResult {
  remise: number;
  prixUnitaireTTC: number;
  prixTotalTTC: number;
}

@Component({
  selector: 'app-ttc-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ttc-calculator.component.html',
  styleUrls: ['./ttc-calculator.component.css'],
})
export class TtcCalculatorComponent implements AfterViewInit {
  @ViewChild('prixHtInput') prixHtInput!: ElementRef<HTMLInputElement>;
  @ViewChild('quantiteInput') quantiteInput!: ElementRef<HTMLInputElement>;
  @ViewChild('tvaInput') tvaInput!: ElementRef<HTMLInputElement>;

  result$!: Observable<TtcResult>;

  ngAfterViewInit() {
    const prix$ = fromEvent<InputEvent>(this.prixHtInput.nativeElement, 'input').pipe(
      map(e => +((e.target as HTMLInputElement).value)),
      startWith(0)
    );

    const quantite$ = fromEvent<InputEvent>(this.quantiteInput.nativeElement, 'input').pipe(
      map(e => +((e.target as HTMLInputElement).value)),
      startWith(1)
    );

    const tva$ = fromEvent<InputEvent>(this.tvaInput.nativeElement, 'input').pipe(
      map(e => +((e.target as HTMLInputElement).value)),
      startWith(18)
    );

    this.result$ = combineLatest([prix$, quantite$, tva$]).pipe(
      map(([ht, qte, tva]): TtcResult => {
        const remise = qte >= 10 && qte <= 15 ? 0.2 : qte > 15 ? 0.3 : 0;
        const prixUnitaireTTC = ht * (1 + tva / 100);
        const prixTotalTTC = prixUnitaireTTC * qte * (1 - remise);
        return { remise, prixUnitaireTTC, prixTotalTTC };
      })
    );
  }
}
