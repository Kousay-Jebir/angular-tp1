import { Component, computed, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    providers: [TodoService],
    standalone: true,
    imports: [FormsModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  // todos = signal<Todo[]>([]);
  todo = new Todo();

  /** Inserted by Angular inject() migration for backwards compatibility */
  // constructor(...args: unknown[]);
  // constructor() {
  //   this.todos.set(this.todoService.getTodos());
  // }
    todos = this.todoService.todos;

  addTodo() {
    const id = crypto.randomUUID();
    this.todo.id=id;
    this.todoService.addTodo(this.todo);
    // this.todos.set(this.todoService.getTodos())
    // this.todos.update(list => [...list, this.todo]);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    console.log(todo)

  }

  updateTodoStatus(todoId:string,newStatus:string){
    this.todoService.updateTodoStatus(todoId,newStatus);


  }

  waitingTodos = computed(() => this.todos().filter(t => t.status === 'waiting'));
  inProgressTodos = computed(() => this.todos().filter(t => t.status === 'in progress'));
  doneTodos = computed(() => this.todos().filter(t => t.status === 'done'));
}
