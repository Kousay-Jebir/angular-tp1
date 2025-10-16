import { Component } from '@angular/core';
import { RainbowDirective } from './rainbow.directive';

@Component({
  selector: 'app-rainbow-page',
  standalone: true,
  imports: [RainbowDirective],
  template: `
    <h2>Input Arc-en-ciel</h2>
    <input rainbow placeholder="input is rainbow" style="border:1px solid black; padding:4px;" />
  `
})
export class RainbowPageComponent {}
