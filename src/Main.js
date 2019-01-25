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
        <div className="Notepad">
        <div className="Header">
          <h1>
            My To-do's
          </h1>
          </div>
        <div className="RedLine"></div>
          <div className="WorkArea">
            <TaskList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
