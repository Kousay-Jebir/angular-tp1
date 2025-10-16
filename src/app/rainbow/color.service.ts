import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private readonly colors = ['red','orange','yellow','green','blue','indigo','violet'];

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}