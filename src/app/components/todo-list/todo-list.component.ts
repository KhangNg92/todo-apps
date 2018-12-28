import { Component, OnInit, Input } from "@angular/core";
import { Todo } from "src/app/models/todo.model";
import { Observable } from "rxjs";
import { TodoService } from "src/app/service/todo.service";
@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.todos$;
  }

  onChangeTodoStatus(todo: Todo) {
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }
}
