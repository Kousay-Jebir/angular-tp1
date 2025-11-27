import { Component, computed, inject } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { Cv } from '../model/cv';

import { ItemComponent } from '../item/item.component';

@Component({
    selector: 'app-embauche',
    templateUrl: './embauche.component.html',
    styleUrls: ['./embauche.component.css'],
    imports: [ItemComponent]
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  // expose the signal for the template
  embauchees = this.embaucheService.embauchees;
}
