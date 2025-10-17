import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { Cv } from '../model/cv';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [NgClass, NgFor, ItemComponent],
})
export class ListComponent {
  @Input() cvs: Cv[] | null = [];
  @Output() selectCv = new EventEmitter<Cv>();
  onSelect(cv: Cv) {
    this.selectCv.emit(cv);
  }
  trackById = (_: number, cv: Cv) => cv.id;
}
