import {makeAutoObservable} from 'mobx';
import { v4 as uuidv4 } from 'uuid';

interface ITodo {
  text: string;
  id: string;
  completed: boolean;
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
      completed: false,
    });
    this.saveToStorage();
  };

  toggleTodo = (todo: ITodo) => {
    todo.completed = !todo.completed;
    this.saveToStorage();
  };

  clearTodos = () => {
    this.todos = [];
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
