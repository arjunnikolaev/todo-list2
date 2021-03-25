import React, {useEffect} from 'react';

import {TodoList} from './components/TodoList';
import {AddTodo} from './components/AddTodo';
import {todoStore} from './stores/TodoStore';

function App() {
  useEffect(() => {
    todoStore.readFromStorage();
  }, []);

  return (
    <div className="todos-app">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
