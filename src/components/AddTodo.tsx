import React, {FormEvent, useCallback, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {observer} from 'mobx-react';

import {todoStore} from '../stores/TodoStore';

export const AddTodo = observer(() => {
  const styles = useStyles();
  const [text, setText] = useState('');

  const addTodo = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      todoStore.addTodo(text.trim());
      setText('');
    }
  }, [text]);
  return (
    <div>
      <form
        onSubmit={(e) => addTodo(e)}
        className={styles.form}>
        <TextField
          className={styles.input}
          label="Todo"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button disabled={!text} className={styles.btn} color="primary" type="submit">Add Todo</Button>
        {!!todoStore.todos.length && (
          <Button className={styles.btn} color="secondary" onClick={todoStore.clearTodos}>Clear todos</Button>
        )}
      </form>
    </div>
  )
});

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  btn: {
    marginLeft: 20,
  },
  input: {
    width: 300,
  }
});
