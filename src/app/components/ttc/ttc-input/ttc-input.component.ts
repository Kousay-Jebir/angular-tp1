import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ttc-input',
    imports: [CommonModule],
    templateUrl: './ttc-input.component.html',
    styleUrls: ['./ttc-input.component.css']
})
export class TtcInputComponent {
  @Input() label = '';
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(Number(input.value) || 0);
  }
}
