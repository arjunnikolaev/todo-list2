import {makeAutoObservable} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface ITodo {
  text: string;
  id: string;
  status: Status;
}

export enum Status {
  New = 'New',
  InProgress = 'InProgress',
  Done = 'Done',
}

class TodoStore {
  todos: ITodo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (text: string) => {
    this.todos.push({
      text,
      id: uuidv4(),
      status: Status.New,
    });
    this.saveToStorage();
  };

  setTodoStatus = (todo: ITodo, status: Status) => {
    todo.status = status;
    this.saveToStorage();
  };

  clearTodos = () => {
    this.todos = [];
    this.saveToStorage();
  };

  deleteTodo = (id: string) => {
    const idx = this.todos.findIndex((t) => t.id === id);
    if (idx !== -1) this.todos.splice(idx, 1);
    this.saveToStorage();
  };

  readFromStorage = () => {
    const str = localStorage.getItem('todos')
    if (str) {
      this.todos = JSON.parse(str)
    }
  }

  private saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}

export const todoStore = new TodoStore();
