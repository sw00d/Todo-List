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
        <DragDropContext
          onBeforeDragStart={this.onBeforeDragStart}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <TaskList />
        </DragDropContext>
      </Provider>
    );
  }
}

export default App;
