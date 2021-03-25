import {observer} from 'mobx-react';

import {Todo} from './Todo';
import {todoStore} from '../stores/TodoStore';
import {makeStyles} from '@material-ui/core/styles';
import {List} from '@material-ui/core';

export const TodoList = observer(() => {
  const styles = useStyles();
  const {todos, toggleTodo} = todoStore;

  return (
    <List component="ul" className={styles.list}>
      {todos.map((todo) => (
        <Todo {...todo} toggleTodo={() => toggleTodo(todo)} key={todo.id} />
      ))}
    </List>
  )
});

const useStyles = makeStyles({
  list: {
    padding: 0,
    marginTop: 20,
  },
})
