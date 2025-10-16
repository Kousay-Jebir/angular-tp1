import { Injectable, inject, signal } from '@angular/core';
import { Todo } from '../model/todo';
import { LoggerService } from '../../services/logger.service';

let n = 1;

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);

  public todos = signal<Todo[]>([]);
  

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  /**
   * elle retourne la liste des todos
   *
   * @returns Todo[]
   */
  getTodos(): Todo[] {
    return this.todos();
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param todo: Todo
   *
   */
  addTodo(todo: Todo): void {
    // this.todos.push(todo);
    this.todos.update(list => [...list, todo]);
  }
  /**
   *Elle permet de mettre a jour todo
   *
   * @param todo: Todo
   *
   */
  updateTodoStatus(todoId:string,newStatus:string){
      this.todos.update(list => 
    list.map(t => t.id == todoId ? { ...t, status: newStatus } : t)
  );

  }

  /**
   * Delete le todo s'il existe
   *
   * @param todo: Todo
   * @returns boolean
   */
  deleteTodo(todo: Todo): any {
    this.todos.update(list => list.filter(t => t !== todo));
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos);
  }
}
