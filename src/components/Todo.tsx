import {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames'
import {ListItem, ListItemText} from '@material-ui/core';

interface Props {
  text: string;
  completed: boolean;
  id?: string;
  toggleTodo(): void;
}

export const Todo: FC<Props> = ({text, completed, id, toggleTodo}) => {
  const styles = useStyles();
  const todoClass = classNames({
    [styles.todo]: true,
    [styles.completed]: completed,
  })

  const click = (e: any) => {
    e.preventDefault();
    toggleTodo();
  }
  return (
    <ListItem onClick={click} button>
      <ListItemText primary={text} className={todoClass} />
    </ListItem>
  )
}

const useStyles = makeStyles({
  todo: {
    padding: 0,
    display: 'flex',
    userSelect: 'none',
    flexDirection: 'column',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  completed: {
    textDecoration: 'line-through',
  },
});
