import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {store} from './reducers'
import TaskList from './components/taskList';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionAppear={true}
          transitionAppearTimeout={700}
        > */}

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

        {/* </ReactCSSTransitionGroup> */}
      </Provider>
    );
  }
}

export default App;
