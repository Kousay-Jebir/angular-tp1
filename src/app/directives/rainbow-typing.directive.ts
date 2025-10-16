import {
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'input[appRainbowTyping]',
  standalone: true,
})
export class RainbowTypingDirective implements OnInit, OnDestroy {
  @HostBinding('style.color') textColor = '';
  @HostBinding('style.border-color') borderColor = '';
  @HostBinding('style.border-style') borderStyle = 'solid';
  @HostBinding('style.border-width') borderWidth = '1px';

  private readonly destroy$ = new Subject<void>();

  private readonly colors = [
    '#e6194B',
    '#3cb44b',
    '#ffe119',
    '#0082c8',
    '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#d2f53c',
    '#fabebe',
    '#008080',
    '#e6beff',
    '#aa6e28',
    '#fffac8',
    '#800000',
    '#aaffc3',
    '#808000',
    '#ffd8b1',
    '#000080',
    '#808080',
  ];

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private r2: Renderer2
  ) {}

  ngOnInit(): void {
    const native = this.el.nativeElement;
    //if (native.tagName.toLowerCase() !== 'input') return;

    this.r2.setStyle(native, 'outline', 'none');

    fromEvent<KeyboardEvent>(native, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const c = this.pickRandomColor();
        this.textColor = c;
        this.borderColor = c;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private pickRandomColor(): string {
    const idx = Math.floor(Math.random() * this.colors.length);
    return this.colors[idx];
  }
}
