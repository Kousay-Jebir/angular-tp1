import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ttc-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ttc-result.component.html',
  styleUrls: ['./ttc-result.component.css'],
})
export class TtcResultComponent {
  @Input() label = '';
  @Input() value = 0;
  // 'blue' | 'green' | 'red' matches your screenshot palette
  @Input() variant: 'blue' | 'green' | 'red' = 'blue';
  // when true, use currency pipe, otherwise print raw number
  @Input() currency = true;
  @Input() currencyCode: string = 'USD';
}
