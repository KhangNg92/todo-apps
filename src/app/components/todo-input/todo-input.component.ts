import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {
  todoContent = '';


  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // onTodoContentChanged(value: string){
  //   console.log(value)
  // }


  // mình check
  onSubmit(){
if(this.todoContent.trim() === ''){
 return false;
}

this.todoService.addTodo(this.todoContent);

// sau khi addTodo mình muốn nó trở về 1 empty string
this.todoContent = '';
}

}
