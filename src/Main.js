import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './reducers'
import TaskList from './components/taskList';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
    console.log("hello")
  };
  render() {
    return (
      <Provider store={store}>
          <TaskList />
      </Provider>
    );
  }
}

export default App;
