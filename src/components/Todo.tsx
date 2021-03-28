import {FC} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {IconButton, Paper} from '@material-ui/core';
import {useDrag} from 'react-dnd';
import DeleteIcon from '@material-ui/icons/Delete';

import {Types} from '../constants/Draggable';
import {ITodo, todoStore} from '../stores/TodoStore';

interface Props {
  todo: ITodo;
}

export const Todo: FC<Props> = ({
  todo,
}) => {
  const styles = useStyles();
  const [{ opacity }, drag, dragPreview] = useDrag(() => ({
    type: Types.Card,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    item: todo,
  }))

  return (
    <div ref={dragPreview} style={{opacity}}>
      <Paper
        ref={drag}
        elevation={3}
        className={styles.todo}>
        <span>{todo.text}</span>
        <IconButton aria-label="delete" onClick={() => todoStore.deleteTodo(todo.id)}>
          <DeleteIcon className={styles.deleteIcon} />
        </IconButton>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todo: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      display: 'flex',
      userSelect: 'none',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    isDragging: {
      opacity: 0.8,
    },
    deleteIcon: {
      color: theme.palette.primary.contrastText,
    },
  }),
);
