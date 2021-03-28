import {Status} from '../stores/TodoStore';
import {makeStyles} from '@material-ui/core/styles';

import {TaskColumn} from './TaskColumn';

export const TaskBoard = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <TaskColumn title="New" status={Status.New} />
      <TaskColumn title="In Progress" status={Status.InProgress} />
      <TaskColumn title="Done" status={Status.Done} />
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})
