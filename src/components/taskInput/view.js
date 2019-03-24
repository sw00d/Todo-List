import React, { Component } from 'react';
import { GoPlus } from 'react-icons/go';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Input extends Component {
  constructor(){
    super();
    this.state = {
      task: '',
    }
    this.addTask = this.addTask.bind(this);
    this.task = React.createRef();
  }

  handleKeyPress = (e) => {
    const { tasks, incrementInput, addTask} = this.props;
    const { value } = e.target
    if(e.key === 'Enter' && tasks.length < 16 && value.length){
      incrementInput();
      addTask(value);
      this.setState({task: ''});
    }
  }
  
  addTask = () =>{
    const { incrementInput, addTask } = this.props;
    const { task } = this.state;
    if (task.length && this.props.tasks.length < 16) {
      incrementInput();
      addTask(task);
    }
    this.setState({task: ''});
  }
  
  render() {
    return (
      <div className="InputContainer" style={{top: this.props.inputVal}}> 
        <div className="checkContainer TaskInputContainer">
            <input 
              className="TaskInput"
              onKeyPress={this.handleKeyPress} 
              onChange={(e)=>this.setState({task: e.target.value})} 
              placeholder="Enter New Task"
              value = {this.state.task}
            />
        </div>
        <div className="AddTaskContainer">
          <GoPlus className="AddBtn" onClick={this.addTask} />
        </div>
      </div>
    );
  }
}

export default Input;


  