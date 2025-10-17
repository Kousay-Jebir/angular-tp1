import { Component, Input } from '@angular/core';
import { Todo } from '../../model/todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-element',
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./todo-element.component.html'
})
export class TodoElementComponent {
  @Input() todos!: Todo[];
  @Input() onDelete!: (todo: Todo) => void;
  @Input() onStatusChange!: (todoId: string, newStatus: string) => void;
}
