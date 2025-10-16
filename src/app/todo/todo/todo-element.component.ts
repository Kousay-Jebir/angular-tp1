// todo-element.component.ts
import { Component, Input } from '@angular/core';
import { Todo } from '../model/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-element',
  standalone: true,
  imports: [FormsModule],
  template: `
    <li>
      {{todo.name}} : {{todo.content}}
      <i (click)="onDelete(todo)" class="fa fa-trash" aria-hidden="true"></i>
      <select [ngModel]="todo.status" (ngModelChange)="onStatusChange(todo.id, $event)"
              class="form-select form-select-sm mt-1">
        <option value="waiting">Waiting</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </li>
  `
})
export class TodoElementComponent {
  @Input() todo!: Todo;
  @Input() onDelete!: (todo: Todo) => void;
  @Input() onStatusChange!: (todoId: string, newStatus: string) => void;
}
