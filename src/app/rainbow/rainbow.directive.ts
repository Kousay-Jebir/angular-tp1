import {
  Directive,
  HostBinding,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { ColorService } from './color.service';

@Directive({
  selector: 'input[rainbow]',
  standalone: true,
})
export class RainbowDirective {
  private colorService = inject(ColorService);
  private currentColor = signal<string>('black');

  @HostBinding('style')
  get styles() {
    return {
      color: this.currentColor(),
      borderColor: this.currentColor(),
    };
  }

  @HostListener('keyup')
  onKeyUp() {
    const newColor = this.colorService.getRandomColor();
    this.currentColor.set(newColor);
  }
}
