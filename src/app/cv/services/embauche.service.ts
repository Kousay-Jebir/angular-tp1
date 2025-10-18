import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({ providedIn: 'root' })
export class EmbaucheService {
  private _embauchees = signal<Cv[]>([]);
  public embauchees = this._embauchees;

  constructor() {}
  getEmbauchees(): Cv[] {
    return this._embauchees();
  }
  embauche(cv: Cv): boolean {
    const exists = this._embauchees().some((e) => e.id === cv.id);
    if (exists) return false;
    this._embauchees.update((list) => [...list, cv]);
    return true;
  }
}
