import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
// STORAGE key la2m thanh 1 bien de ko phai viet todo de tuong tac vs localstorage

//
  private static readonly TodoStorageKey = 'todos';
// todos là tổng todo mình có đc
  private todos: Todo[];
  // filteredTodos là tods mình sẽ thấy trên front-end của mình
  private filteredTodos: Todo[];
  // lenght sẽ theo dõi length của todos
  // behaviorsubject sẽ phải nhận vô giá trị ban đầu, giá trị ban đầu là 0
  private lengthSubject: BehaviorSubject<number> =  new BehaviorSubject<number>(0);

  // displayTodoSubject sẽ theo dõi filteredTodo
  // sẽ bắt đầu = 1 empty array
  private displayTodoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);


  private currentFilter: Filter = Filter.All;

  // subject dưới dạng observer thì sẽ đẩy đc giá trị mới vào stream
  //
  todos$: Observable<Todo[]> = this.displayTodoSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();


  constructor(private storageService: LocalStorageService) { }


  fetchFromLocalStorage(){
    // dùng hàm getValue để truyền vào type là  <Todo[]> sau đó chuyền qua key
    // nếu trong localstorage có todos thì trả về giá trị Todo array và gán giá trị vào mảng todos
    // nếu ko có gì thì trả về empty array
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];

    // filteredTodos là 1 mảng
    // shallow clone
    // deep clone mình copy phần tử ở trong cái todos
    // có thể sử dụng cloneDeep của lodash
    //
    this.filteredTodos = [...this.todos.map(todo => ({...todo}))];
    this.updateTodosData();

  }


// khi làm add, edit, delete todo thì mình sẽ thay đổi thằng this.todos
  updateToLocalStorage(){
    //
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    //
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData()
  }


  //
   filterTodos(filter: Filter, isFiltering: boolean = true){

    // gán lại thằng current filter

    this.currentFilter = filter;
    switch(filter){
      case Filter.Active:
      this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
      break;
      case Filter.Completed:
      this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
      break;
      case Filter.All:
      this.filteredTodos = [...this.todos.filter(todo => ({...todo}))];
      break;
    }

    //
     if(isFiltering){
       this.updateTodosData();
     }
   }


  private updateTodosData() {
    this.displayTodoSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  // addTodo nhận vào content là string
  addTodo(content: string){
    // xài getTime để trả về miliseconds
    const date = new Date(Date.now()).getTime(); //will be a number

    // new Todo sẽ chạy hàm constructor date, content isCompleted là optional
    const newTodo = new Todo(date, content);

    //unshift thì khi add nó sẽ hiện ở đầu
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }
}
