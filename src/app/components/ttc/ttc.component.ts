import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtcInputComponent } from './ttc-input/ttc-input.component';
import { TtcResultComponent } from './ttc-result/ttc-result.component';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [CommonModule, TtcInputComponent, TtcResultComponent],
  templateUrl: './ttc.component.html',
  styleUrls: ['./ttc.component.css'],
})
export class TtcComponent {
  priceHT = signal(0);
  quantity = signal(1);
  tva = signal(18);

  discountRate = computed(() => {
    const q = this.quantity();
    if (q >= 10 && q <= 15) return 0.2;
    if (q > 15) return 0.3;
    return 0;
  });

  subtotalHT = computed(() => this.priceHT() * this.quantity());
  discount = computed(() => this.subtotalHT() * this.discountRate());
  subtotalAfterDiscount = computed(() => this.subtotalHT() - this.discount());
  unitPriceTTC = computed(() => this.priceHT() * (1 + this.tva() / 100));
  totalTTC = computed(
    () => this.subtotalAfterDiscount() * (1 + this.tva() / 100)
  );
}
