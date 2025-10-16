import { Component } from '@angular/core';
import { RainbowTypingDirective } from 'src/app/directives/rainbow-typing.directive';
@Component({
  selector: 'app-rainbow-playground',
  standalone: true,
  imports: [RainbowTypingDirective],
  templateUrl: './rainbow-playground.component.html',
  styleUrls: ['./rainbow-playground.component.css'],
})
export class RainbowPlaygroundComponent {}
