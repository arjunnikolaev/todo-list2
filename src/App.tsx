import React, {useEffect} from 'react';

import {AddTodo} from './components/AddTodo';
import {todoStore} from './stores/TodoStore';
import {TaskBoard} from './components/TaskBoard';
import {makeStyles} from '@material-ui/core/styles';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {
  const styles = useStyles();
  useEffect(() => {
    todoStore.readFromStorage();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AddTodo />
        <TaskBoard />
      </div>
    </DndProvider>
  );
}

const useStyles = makeStyles({
  app: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
  }
})

export default App;
