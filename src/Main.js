import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './reducers'
import TaskList from './components/taskList';
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <TaskList />
        </div>
      </Provider>
    );
  }
}

export default App;
