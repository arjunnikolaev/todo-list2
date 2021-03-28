import {ITodo, Status, todoStore} from '../stores/TodoStore';
import {FC, useMemo} from 'react';
import {observer} from 'mobx-react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {List} from '@material-ui/core';
import {Todo} from './Todo';
import {Types} from '../constants/Draggable';
import {useDrop} from 'react-dnd';
import classNames from 'classnames';

interface Props {
  title: string;
  status: Status;
}

export const TaskColumn: FC<Props> = observer(({title, status}) => {
  const styles = useStyles();
  const {todos, setTodoStatus} = todoStore;
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: Types.Card,
    collect: (monitor) => ({
      canDrop: monitor.canDrop() && monitor.getItem<ITodo>().status !== status
    }),
    drop: ((item: ITodo, monitor) => {
      setTodoStatus(item, status);
    })
  }))
  const columnClass = useMemo(() => (
    classNames({
      [styles.list]: true,
      [styles.canDrop]: canDrop,
    })
  ), [canDrop]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <List component="ul" className={columnClass} ref={drop}>
        {todos
          .filter((t) => t.status === status)
          .map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
            />
          ))
        }
      </List>
    </div>
  )
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '30%',
    },
    title: {
      textAlign: 'center',
    },
    list: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      height: '100%',
    },
    canDrop: {
      backgroundColor: theme.palette.background.default,
    },
  }))
